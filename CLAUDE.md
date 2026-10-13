# Proiect Bean There

## Cine sunt și cum lucrăm
- Sunt începător și învăț dezvoltare web. Proiectul e un demo pentru portofoliu: vreau să-i arăt fratelui meu, care lucrează în domeniu, că pot face un proiect complet, ca să mă angajez.
- Lucrez pe Windows 11, cam 2 ore pe zi. Am VS Code, GitHub Desktop și cont GitHub. Am mai folosit puțin N8N și Vercel.
- Vorbește-mi în română, simplu, pe înțelesul unui începător.
- **Aplicația e 100% în engleză:** texte, adrese de pagini, nume de produse, cod și comentarii din cod. Nimic în română în aplicație. Doar discuțiile cu mine sunt în română.
- Dacă îți spun „fă tot ce poți”, mergi singur din pas în pas și te oprești doar când ai nevoie de mine (conturi, chei, decizii reale).
- Lucrăm pas cu pas. Înainte de orice lucru mai mare, propune-mi un plan scurt și așteaptă să confirm.
- La fiecare pas, explică pe scurt ce faci și de ce.
- Nu trece la pasul următor până nu confirm eu că pasul curent merge.
- După fiecare bucată care funcționează, propune-mi un commit pe GitHub, cu un mesaj clar.
- Nu pune niciodată chei secrete (Supabase, email etc.) în cod sau pe GitHub. Folosește `.env.local`, care e în `.gitignore`.

## Ce construim
Un singur proiect Next.js care e în același timp site, aplicație web și aplicație de telefon, pentru cafeneaua fictivă „Bean There”. Clienții comandă cafea online și o **ridică de la cafenea** (fără livrare).

## Funcționalități
- Site de prezentare: pagina principală, despre noi, program, locație.
- Meniu: produsele vin din baza de date Supabase, cu categorii (Cafea, Ceai, Suc, Prăjituri).
- Mărimi pentru băuturi (250 / 350 / 450 ml), fiecare cu un preț în plus.
- Cont și login pentru clienți (Supabase Auth).
- Coș de cumpărături: adaugă, modifică cantitatea, șterge, notă opțională, vezi totalul.
- Formular de comandă: nume și telefon, salvează comanda și produsele în Supabase.
- Urmărire comandă: listă de stări (Comandă primită → Se prepară → Gata de ridicare), fără hartă.
- Automatizare N8N: la o comandă nouă, clientul primește email de confirmare, iar eu primesc email cu comanda.
- Panou admin protejat cu parolă: văd toate comenzile și schimb starea (inclusiv „gata”).
- Deploy pe Vercel: link public.
- PWA: se poate adăuga pe ecranul telefonului, cu iconiță.
- APK Android (cu Capacitor): pe site e un buton „Descarcă aplicația” care descarcă APK-ul direct din GitHub Releases. Pe iPhone, butonul arată instrucțiunile pentru PWA.

## Stil vizual (decis pe baza screenshot-ului de inspirație)
- Temă întunecată: fundal maro-negru, text și detalii crem, butoane maro-caramel cu colțuri rotunjite.
- Poze mari cu cafea, carduri cu umbre fine, aspect modern și curat.
- Gândit întâi pentru telefon. Bară de navigare jos: Acasă · Meniu · Comenzi · Profil.
- Ecrane inspirate din design: bun venit, pagina principală, detalii produs, coș, confirmare comandă, stare comandă.

## Harta paginilor (construită la pasul 3)
```
/               → Pagina principală (bun venit + categorii + produse populare)
/menu           → Meniul complet, cu filtre pe categorii (?category=Coffee)
/product/[id]   → Detalii produs: mărime, cantitate, „Add to cart”
/cart           → Coșul: cantități, șterge, notă, total, „Checkout”
/checkout       → Formular: nume + telefon
/checkout/done  → „Order placed!” + numărul comenzii
/orders         → Starea comenzilor
/about          → Despre noi, program, locație
/login          → Cont client
/admin          → Panou admin (încă neprotejat, parola la pasul 9)
```
Categorii în aplicație: Coffee, Tea, Juice, Pastries. Stări: Order received → Preparing → Ready for pickup.

## Stack
- Next.js, cu Tailwind pentru stiluri
- Supabase: bază de date și autentificare
- N8N: automatizări și emailuri
- GitHub: codul
- Vercel: publicare online
- Capacitor: aplicația Android

## Ordinea pașilor
1. Planificarea: paginile și legăturile dintre ele
2. Setup: proiect Next.js plus repository GitHub
3. Design: pagini statice cu date false
4. Supabase: tabelele products și orders, plus produse de test
5. Meniul afișat din baza de date
6. Coșul de cumpărături
7. Login și trimiterea comenzii în Supabase
8. Fluxul N8N pentru emailuri
9. Panoul admin
10. Deploy pe Vercel
11. PWA
12. APK Android și butonul „Descarcă aplicația”

## Unde am rămas
(Actualizează secțiunea asta la finalul fiecărei sesiuni: ce s-a terminat și care e următorul pas.)

- **2026-10-13:** Am stabilit designul (temă întunecată, după screenshot), ridicare în loc de livrare, stări în loc de hartă și mărimi de la început. Harta paginilor e propusă, o confirmăm după ce vedem paginile la pasul 3.
- **Rezolvat:** Git (2.56), Node.js (24.21) și npm (11.19) sunt instalate. Merg în PowerShell; în terminalul Bash al lui Claude Code nu sunt găsite, deci comenzile se rulează prin PowerShell.
- **Pasul 2 gata:** proiect Next.js 16 + Tailwind 4 (JavaScript), repo public: github.com/cristianlupu08/Bean-There (ramura `main`).
- **Pasul 3 gata (plus o parte din 6):** toate paginile, în engleză, cu date de test în `lib/products.js`. Coșul și comenzile merg deja, dar sunt salvate în browser (`localStorage`, în `lib/cart.js` și `lib/orders.js`); la pasul 7 le mutăm în Supabase. Pozele vin de pe Unsplash.
- **Atenție Next.js 16:** Cache Components e activat, așa că orice citire din `params`/`searchParams` trebuie pusă într-un `<Suspense>` (vezi `app/menu/page.js` și `app/product/[id]/page.js`).
- **Următorul pas:** pasul 4, Supabase (trebuie cont Supabase și cheile puse în `.env.local`).
