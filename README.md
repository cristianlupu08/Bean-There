# ☕ Bean There

A coffee shop ordering app: customers browse the menu, order from their phone and **pick up at the café**, with no queue.
One Next.js codebase works as a website, an installable web app (PWA) and an Android app.

**Live demo: [bean-there-blush.vercel.app](https://bean-there-blush.vercel.app)**

> Portfolio project, built step by step while learning full-stack web development.

## Features

- **Menu from the database:** products, categories (Coffee, Tea, Juice, Pastries) and photos are stored in Supabase.
- **Drink sizes:** 250 / 350 / 450 ml, each with its own extra price.
- **Cart:** add, change quantity, remove, add a note for the barista, see the total.
- **Checkout:** name and phone; the order is saved in Supabase with a real order number.
- **Tamper-proof prices:** the browser only sends product ids, sizes and quantities. Prices and totals are calculated by a Postgres function (`place_order`), so they can't be faked.
- **Order tracking:** Order received → Preparing → Ready for pickup, refreshed automatically.
- **Guest or account:** guests track orders placed from their device; signed-in customers (Supabase Auth) see their orders on any device.
- **Admin panel:** password-protected `/admin` page with a signed, httpOnly cookie. Staff see every order and change its status. Database writes use the secret key on the server only.
- **Mobile first, desktop friendly:** bottom navigation on phones, top navigation and wide layouts on computers, animated coffee beans on wide screens.
- **PWA:** installable on the phone's home screen with its own icon.

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, Cache Components, Server Actions), React 19 |
| Styling | Tailwind CSS 4 |
| Database & auth | [Supabase](https://supabase.com) (Postgres, Row Level Security, Auth) |
| Hosting | Vercel |
| Planned | N8N email automation, Android app with Capacitor |

## How it works

```
Browser ──► Next.js pages ──► Supabase
              │
              ├─ Menu pages: read products on the server, cached for a few minutes ("use cache")
              ├─ Checkout: calls the place_order() database function (prices calculated in Postgres)
              ├─ Orders: calls get_my_orders() with this device's tracking tokens + the signed-in user
              └─ /admin: Server Actions with the secret key, behind a password cookie
```

Row Level Security is enabled on every table: anyone can read the menu, but orders can only be
created and read through the database functions above, so customers' phone numbers stay private.

## Project structure

```
app/                 Pages (home, menu, product/[id], cart, checkout, orders, about, login, admin)
components/          Shared UI (navigation, product card, quantity picker, decorations)
lib/                 Data and logic (products, cart, orders, auth, Supabase clients, admin auth)
supabase/            SQL scripts to create the database
public/              App icons
```

## Run it locally

1. Install [Node.js](https://nodejs.org) (LTS) and clone the repository.
2. Create a free Supabase project, open **SQL Editor** and run, in order:
   - `supabase/setup.sql` (tables, security rules, test products)
   - `supabase/02-orders.sql` (ordering and tracking functions)
3. Create a `.env.local` file in the project folder:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   SUPABASE_SECRET_KEY=sb_secret_...
   ADMIN_PASSWORD=choose-a-password
   ```

4. Install and start:

   ```bash
   npm install
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000). The admin panel is at `/admin`.

## Roadmap

- [x] Pages and design
- [x] Menu, cart, checkout and order tracking with Supabase
- [x] Customer accounts
- [x] Password-protected admin panel
- [x] PWA
- [x] Public deployment on Vercel
- [ ] Order confirmation emails with N8N
- [ ] Android app (Capacitor) with a "Download the app" button

## Credits

Product photos from [Unsplash](https://unsplash.com).
