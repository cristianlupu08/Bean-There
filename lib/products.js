// Test data for the menu. Later this will come from Supabase,
// using the same shape so the pages don't need to change.

const photo = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=75&auto=format&fit=crop`;

export const CATEGORIES = ["Coffee", "Tea", "Juice", "Pastries"];

// Drink sizes and how much each one adds to the price (in RON).
export const SIZES = [
  { ml: 250, extra: 0 },
  { ml: 350, extra: 3 },
  { ml: 450, extra: 5 },
];

export const PRODUCTS = [
  {
    id: "espresso",
    name: "Espresso",
    category: "Coffee",
    description: "Short, intense and aromatic. 100% arabica beans, roasted locally.",
    price: 8,
    image: photo("1514432324607-a09d9b4aefdd"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "Coffee",
    description: "Espresso with creamy steamed milk and foam in equal parts.",
    price: 12,
    image: photo("1572442388796-11668a67e53d"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "latte",
    name: "Caffè Latte",
    category: "Coffee",
    description: "Smooth espresso with plenty of warm milk and a thin layer of foam.",
    price: 13,
    image: photo("1541167760496-1628856ab772"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "Coffee",
    description: "Double espresso with velvety milk. A bold coffee taste.",
    price: 14,
    image: photo("1495474472287-4d71bcdd2085"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "Coffee",
    description: "Espresso poured over cold milk and ice cubes.",
    price: 15,
    image: photo("1461023058943-07fcbe16d735"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    category: "Tea",
    description: "Japanese matcha green tea whisked with warm milk.",
    price: 16,
    image: photo("1515823064-d6e0c04616a7"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "green-tea",
    name: "Green Tea",
    category: "Tea",
    description: "Loose-leaf green tea, served in a teapot.",
    price: 9,
    image: photo("1564890369478-c89ca6d9cde9"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "fruit-tea",
    name: "Fruit Tea",
    category: "Tea",
    description: "Forest fruit and hibiscus infusion, caffeine-free.",
    price: 9,
    image: photo("1571934811356-5cc061b6821f"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "iced-tea",
    name: "Iced Lime Tea",
    category: "Tea",
    description: "Chilled black tea with fresh lime and ice.",
    price: 11,
    image: photo("1556679343-c7306c1976bc"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "orange-juice",
    name: "Orange Juice",
    category: "Juice",
    description: "Freshly squeezed oranges, no added sugar.",
    price: 12,
    image: photo("1600271886742-f049cd451bba"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "mint-lemonade",
    name: "Mint Lemonade",
    category: "Juice",
    description: "Lemon, lime and fresh mint, lightly sweetened.",
    price: 11,
    image: photo("1621263764928-df1444c5e859"),
    popular: true,
    hasSizes: true,
  },
  {
    id: "citrus-spritz",
    name: "Citrus Spritz",
    category: "Juice",
    description: "Grapefruit, orange and sparkling water, with rosemary.",
    price: 13,
    image: photo("1523371054106-bbf80586c38c"),
    popular: false,
    hasSizes: true,
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "Pastries",
    description: "Flaky butter pastry, baked fresh every morning.",
    price: 9,
    image: photo("1555507036-ab1f4038808a"),
    popular: true,
    hasSizes: false,
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    category: "Pastries",
    description: "A slice of cake with dark chocolate cream.",
    price: 16,
    image: photo("1578985545062-69928b1d9587"),
    popular: false,
    hasSizes: false,
  },
  {
    id: "brownie",
    name: "Brownie",
    category: "Pastries",
    description: "Fudgy inside, with chocolate chunks and warm sauce.",
    price: 12,
    image: photo("1606313564200-e75d5e30476c"),
    popular: false,
    hasSizes: false,
  },
];

export function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

export function formatPrice(lei) {
  return `${lei.toFixed(2)} RON`;
}
