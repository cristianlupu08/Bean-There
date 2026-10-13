-- Bean There database setup.
-- Paste this whole file into Supabase → SQL Editor → New query, then click "Run".
-- It is safe to run more than once.

-- ─────────────────────────────────────────────
-- Tables
-- ─────────────────────────────────────────────

create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null check (category in ('Coffee', 'Tea', 'Juice', 'Pastries')),
  description text not null default '',
  price numeric(6, 2) not null check (price >= 0),
  image_url text not null,
  popular boolean not null default false,
  has_sizes boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- The order id doubles as the order number shown to the customer (starts at 1001).
create table if not exists public.orders (
  id bigint generated always as identity (start with 1001) primary key,
  user_id uuid references auth.users (id) on delete set null,
  customer_name text not null,
  phone text not null,
  note text not null default '',
  total numeric(8, 2) not null check (total >= 0),
  status text not null default 'received' check (status in ('received', 'preparing', 'ready')),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders (id) on delete cascade,
  product_id text references public.products (id) on delete set null,
  product_name text not null,
  size_ml int check (size_ml in (250, 350, 450)),
  unit_price numeric(6, 2) not null check (unit_price >= 0),
  quantity int not null check (quantity > 0)
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists orders_user_id_idx on public.orders (user_id);

-- ─────────────────────────────────────────────
-- Security (Row Level Security)
-- Everyone can read the menu. Orders stay locked for now;
-- access rules for orders are added together with checkout and login.
-- ─────────────────────────────────────────────

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Anyone can read products" on public.products;
create policy "Anyone can read products"
  on public.products for select
  to anon, authenticated
  using (true);

-- ─────────────────────────────────────────────
-- Test products (prices in euro)
-- ─────────────────────────────────────────────

insert into public.products (id, name, category, description, price, image_url, popular, has_sizes, sort_order) values
  ('espresso', 'Espresso', 'Coffee', 'Short, intense and aromatic. 100% arabica beans, roasted locally.', 2.50, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=75&auto=format&fit=crop', true, true, 1),
  ('cappuccino', 'Cappuccino', 'Coffee', 'Espresso with creamy steamed milk and foam in equal parts.', 3.50, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=75&auto=format&fit=crop', true, true, 2),
  ('latte', 'Caffè Latte', 'Coffee', 'Smooth espresso with plenty of warm milk and a thin layer of foam.', 3.80, 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=75&auto=format&fit=crop', true, true, 3),
  ('flat-white', 'Flat White', 'Coffee', 'Double espresso with velvety milk. A bold coffee taste.', 4.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=75&auto=format&fit=crop', false, true, 4),
  ('iced-latte', 'Iced Latte', 'Coffee', 'Espresso poured over cold milk and ice cubes.', 4.20, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=75&auto=format&fit=crop', true, true, 5),
  ('matcha-latte', 'Matcha Latte', 'Tea', 'Japanese matcha green tea whisked with warm milk.', 4.50, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=75&auto=format&fit=crop', true, true, 6),
  ('green-tea', 'Green Tea', 'Tea', 'Loose-leaf green tea, served in a teapot.', 2.80, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=75&auto=format&fit=crop', false, true, 7),
  ('fruit-tea', 'Fruit Tea', 'Tea', 'Forest fruit and hibiscus infusion, caffeine-free.', 2.80, 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=75&auto=format&fit=crop', false, true, 8),
  ('iced-tea', 'Iced Lime Tea', 'Tea', 'Chilled black tea with fresh lime and ice.', 3.20, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=75&auto=format&fit=crop', false, true, 9),
  ('orange-juice', 'Orange Juice', 'Juice', 'Freshly squeezed oranges, no added sugar.', 3.50, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=75&auto=format&fit=crop', false, true, 10),
  ('mint-lemonade', 'Mint Lemonade', 'Juice', 'Lemon, lime and fresh mint, lightly sweetened.', 3.20, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=75&auto=format&fit=crop', true, true, 11),
  ('citrus-spritz', 'Citrus Spritz', 'Juice', 'Grapefruit, orange and sparkling water, with rosemary.', 3.80, 'https://images.unsplash.com/photo-1523371054106-bbf80586c38c?w=800&q=75&auto=format&fit=crop', false, true, 12),
  ('croissant', 'Butter Croissant', 'Pastries', 'Flaky butter pastry, baked fresh every morning.', 2.50, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=75&auto=format&fit=crop', true, false, 13),
  ('chocolate-cake', 'Chocolate Cake', 'Pastries', 'A slice of cake with dark chocolate cream.', 4.50, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=75&auto=format&fit=crop', false, false, 14),
  ('brownie', 'Brownie', 'Pastries', 'Fudgy inside, with chocolate chunks and warm sauce.', 3.50, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=75&auto=format&fit=crop', false, false, 15)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  image_url = excluded.image_url,
  popular = excluded.popular,
  has_sizes = excluded.has_sizes,
  sort_order = excluded.sort_order;
