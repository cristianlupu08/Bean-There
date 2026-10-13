-- Bean There: placing and tracking orders.
-- Run this AFTER setup.sql: Supabase → SQL Editor → New query → paste → Run.
-- It is safe to run more than once.

-- Each order gets a secret tracking token. The device that placed the order keeps it,
-- so guests (not signed in) can still follow their order status.
alter table public.orders
  add column if not exists tracking_token uuid not null default gen_random_uuid();

create unique index if not exists orders_tracking_token_idx on public.orders (tracking_token);

-- ─────────────────────────────────────────────
-- place_order: the only way customers can create orders.
-- The browser only sends WHICH products and sizes; prices and the total
-- are calculated here from the products table, so they can't be faked.
-- Size extras must match SIZES in lib/menu.js.
-- ─────────────────────────────────────────────
create or replace function public.place_order(
  p_name text,
  p_phone text,
  p_note text,
  p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order public.orders;
  v_item jsonb;
  v_product public.products;
  v_size int;
  v_qty int;
  v_extra numeric;
  v_total numeric := 0;
begin
  p_name := trim(coalesce(p_name, ''));
  p_phone := regexp_replace(coalesce(p_phone, ''), '\s', '', 'g');

  if length(p_name) < 2 or length(p_name) > 60 then
    raise exception 'Please enter your name.';
  end if;
  if p_phone !~ '^0[0-9]{9}$' then
    raise exception 'Please enter a valid phone number (10 digits, starting with 0).';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 30 then
    raise exception 'Your cart is empty.';
  end if;

  insert into public.orders (user_id, customer_name, phone, note, total)
  values (auth.uid(), p_name, p_phone, left(trim(coalesce(p_note, '')), 300), 0)
  returning * into v_order;

  for v_item in select * from jsonb_array_elements(p_items) loop
    select * into v_product from public.products where id = v_item ->> 'product_id';
    if not found then
      raise exception 'A product in your cart is no longer available.';
    end if;

    v_qty := (v_item ->> 'quantity')::int;
    if v_qty is null or v_qty < 1 or v_qty > 20 then
      raise exception 'Invalid quantity for %.', v_product.name;
    end if;

    if v_product.has_sizes then
      v_size := (v_item ->> 'size_ml')::int;
      v_extra := case v_size when 250 then 0 when 350 then 0.5 when 450 then 1 end;
      if v_extra is null then
        raise exception 'Invalid size for %.', v_product.name;
      end if;
    else
      v_size := null;
      v_extra := 0;
    end if;

    insert into public.order_items (order_id, product_id, product_name, size_ml, unit_price, quantity)
    values (v_order.id, v_product.id, v_product.name, v_size, v_product.price + v_extra, v_qty);

    v_total := v_total + (v_product.price + v_extra) * v_qty;
  end loop;

  update public.orders set total = v_total where id = v_order.id;

  return jsonb_build_object(
    'id', v_order.id,
    'tracking_token', v_order.tracking_token,
    'total', v_total
  );
end;
$$;

-- ─────────────────────────────────────────────
-- get_my_orders: orders placed from this device (by tracking token)
-- plus, when signed in, every order of the signed-in customer.
-- ─────────────────────────────────────────────
create or replace function public.get_my_orders(p_tokens uuid[] default '{}')
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(jsonb_agg(to_jsonb(o) order by o.created_at desc), '[]'::jsonb)
  from (
    select
      ord.id,
      ord.total,
      ord.status,
      ord.note,
      ord.created_at,
      (
        select coalesce(
          jsonb_agg(
            jsonb_build_object(
              'product_name', i.product_name,
              'size_ml', i.size_ml,
              'unit_price', i.unit_price,
              'quantity', i.quantity
            ) order by i.id
          ),
          '[]'::jsonb
        )
        from public.order_items i
        where i.order_id = ord.id
      ) as items
    from public.orders ord
    where ord.tracking_token = any (coalesce(p_tokens, '{}'))
       or (auth.uid() is not null and ord.user_id = auth.uid())
    order by ord.created_at desc
    limit 50
  ) o;
$$;

revoke all on function public.place_order(text, text, text, jsonb) from public;
revoke all on function public.get_my_orders(uuid[]) from public;
grant execute on function public.place_order(text, text, text, jsonb) to anon, authenticated;
grant execute on function public.get_my_orders(uuid[]) to anon, authenticated;
