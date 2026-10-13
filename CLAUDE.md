# Bean There Project

## Who I am and how we work
- I'm a beginner learning web development. This project is a portfolio demo: I want to show my brother, who works in the field, that I can build a complete project, so I can get hired.
- I work on Windows 11, about 2 hours a day. I have VS Code, GitHub Desktop and a GitHub account. I've used N8N and Vercel a little.
- **Talk to me in Romanian**, simply, in a way a beginner understands.
- **The app is 100% in English:** UI text, page URLs, product names, code and code comments. Nothing in Romanian in the app or the repo. Only our conversations are in Romanian. Prices are in **euro** (e.g. €3.50).
- If I tell you "do everything you can", go step by step on your own and only stop when you need me (accounts, keys, real decisions).
- We work step by step. Before any bigger piece of work, propose a short plan and wait for my confirmation.
- At each step, briefly explain what you're doing and why.
- Don't move on to the next step until I confirm the current one works.
- After each piece that works, propose a GitHub commit with a clear message (in English).
- Never put secret keys (Supabase, email etc.) in the code or on GitHub. Use `.env.local`, which is in `.gitignore`.

## What we're building
A single Next.js project that is at the same time a website, a web app and a phone app, for the fictional coffee shop "Bean There". Customers order coffee online and **pick it up at the café** (no delivery).

## Features
- Presentation site: home page, about us, opening hours, location.
- Menu: products come from the Supabase database, with categories (Coffee, Tea, Juice, Pastries).
- Drink sizes (250 / 350 / 450 ml), each with an extra price.
- Customer account and login (Supabase Auth).
- Shopping cart: add, change quantity, remove, optional note, see the total.
- Checkout form: name and phone, saves the order and its items in Supabase.
- Order tracking: a list of statuses (Order received → Preparing → Ready for pickup), no map.
- N8N automation: on a new order, the customer gets a confirmation email and I get an email with the order.
- Password-protected admin panel: I see all orders and change their status (including "ready").
- Deploy on Vercel: public link.
- PWA: can be added to the phone's home screen, with an icon.
- Android APK (with Capacitor): the site has a "Download the app" button that downloads the APK directly from GitHub Releases. On iPhone, the button shows the PWA install instructions.

## Visual style (based on the inspiration screenshot)
- Dark theme: **deep forest green background** (`ink` #0e1915, cards `surface` #172520), cream text, caramel buttons with rounded corners. I tried brown and light gray backgrounds; the green stays (decided 2026-10-13).
- Color tokens are in `app/globals.css`: `ink`, `surface`, `surface-light`, `cream`, `cream-muted`, `caramel`, `caramel-dark`.
- Large coffee photos, cards with soft shadows, modern and clean look.
- Mobile first, but must also look good on computers: on phones a bottom navigation bar (Home · Menu · Orders · Profile), on `md+` a top nav (`components/TopNav.js`), wide layouts (3–4 product columns, two-column product/cart/about pages), and floating coffee beans on the sides on `xl+` (`components/SideDecor.js`).
- Screens inspired by the design: welcome, home, product details, cart, order confirmation, order status.

## Page map (built in step 3)
```
/               → Home (welcome + categories + popular products)
/menu           → Full menu with category filters (?category=Coffee)
/product/[id]   → Product details: size, quantity, "Add to cart"
/cart           → Cart: quantities, remove, note, total, "Checkout"
/checkout       → Form: name + phone
/checkout/done  → "Order placed!" + order number
/orders         → Order status
/about          → About us, opening hours, location
/login          → Customer account
/admin          → Admin panel (not protected yet, password in step 9)
```

## Stack
- Next.js, with Tailwind for styling
- Supabase: database and authentication
- N8N: automations and emails
- GitHub: code
- Vercel: hosting
- Capacitor: Android app

## Order of steps
1. Planning: pages and how they link together
2. Setup: Next.js project plus GitHub repository
3. Design: static pages with fake data
4. Supabase: `products` and `orders` tables, plus test products
5. Menu loaded from the database
6. Shopping cart
7. Login and saving orders in Supabase
8. N8N email flow
9. Admin panel
10. Deploy on Vercel
11. PWA
12. Android APK and the "Download the app" button

## Where we left off
(Update this section at the end of each session: what's done and what the next step is.)

- **2026-10-13:** Design decided (dark theme, based on the screenshot), pickup instead of delivery, statuses instead of a map, sizes from the start.
- **Tools:** Git (2.56), Node.js (24.21) and npm (11.19) are installed. They work in PowerShell; the Claude Code Bash terminal can't find them, so run commands through PowerShell. `git push` from Claude Code fails (no credentials), so I push with GitHub Desktop ("Push origin").
- **Step 2 done:** Next.js 16 + Tailwind 4 project (JavaScript), public repo: github.com/cristianlupu08/Bean-There (branch `main`).
- **Step 3 done (plus part of step 6):** all pages, in English, with test data in `lib/products.js` (prices in euro). Cart and orders already work but are stored in the browser (`localStorage`, in `lib/cart.js` and `lib/orders.js`); in step 7 we move them to Supabase. Photos come from Unsplash.
- **Next.js 16 gotcha:** Cache Components is enabled, so any read of `params`/`searchParams` must be inside a `<Suspense>` (see `app/menu/page.js` and `app/product/[id]/page.js`).
- **Step 11 done early (PWA):** `app/manifest.js`, icons in `public/` and `app/` (generated with a PowerShell System.Drawing script). Install test only possible after deploy (HTTPS).
- **Step 4 done:** Supabase project `mjgrzrrtimeczpzlyqdw` (Frankfurt). Schema + 15 products from `supabase/setup.sql` (tables `products`, `orders`, `order_items`; RLS on, products readable by everyone, orders locked for now). `.env.local` has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. The user runs SQL by pasting it into Supabase SQL Editor.
- **Step 5 done:** menu, home and product pages read from Supabase via `lib/products.js` (`"use cache"` + `cacheLife("minutes")` + `cacheTag("products")`). Client-safe constants (`CATEGORIES`, `SIZES`, `formatPrice`) are in `lib/menu.js`.
- **Steps 7 + 9 code written:** orders go through the `place_order` Postgres function (prices calculated in the DB) and are read with `get_my_orders` (by device tracking tokens + signed-in user), see `supabase/02-orders.sql` and `lib/orders.js`. Customer login is client-side Supabase Auth (`lib/auth.js`, `app/login/AccountView.js`). Admin panel `/admin`: password from `ADMIN_PASSWORD`, signed httpOnly cookie (`lib/adminAuth.js`), reads/updates orders with `SUPABASE_SECRET_KEY` on the server only (`lib/supabaseAdmin.js`, `app/admin/actions.js`).
- **Steps 7 + 9 done and tested:** `02-orders.sql` ran, secret key + admin password are in `.env.local`. Test orders #1001 and #1002 in the DB; the user signed in to /admin and placed an order through the UI. Not yet tried by the user: wrong admin password, customer sign up.
- **Testing tip:** Supabase rejects secret keys from PowerShell (`Invoke-RestMethod` looks like a browser). Test server-side calls with a Node script that uses `process.loadEnvFile(".env.local")`.
- **Before deploying:** the user must choose a NEW admin password (the current one was visible in a screenshot).
- **Next step:** step 10 (Vercel deploy) or step 8 (N8N emails), the user chooses.
