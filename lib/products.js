import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "./supabase";

// Products are read from the Supabase "products" table.
// "use cache" keeps the result for a few minutes, so pages stay fast
// and we don't query the database on every visit.

const COLUMNS = "id, name, category, description, price, image_url, popular, has_sizes";

// Turn a database row into the shape the pages use.
function toProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    price: Number(row.price),
    image: row.image_url,
    popular: row.popular,
    hasSizes: row.has_sizes,
  };
}

export async function getProducts() {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const { data, error } = await supabase.from("products").select(COLUMNS).order("sort_order");
  if (error) throw new Error(`Could not load products: ${error.message}`);
  return data.map(toProduct);
}

export async function getProduct(id) {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const { data, error } = await supabase.from("products").select(COLUMNS).eq("id", id).maybeSingle();
  if (error) throw new Error(`Could not load product: ${error.message}`);
  return data ? toProduct(data) : null;
}
