# Proiect Bean There

## Cine sunt și cum lucrăm
- Sunt începător și învăț dezvoltare web. Proiectul e un demo pentru portofoliu: vreau să-i arăt fratelui meu, care lucrează în domeniu, că pot face un proiect complet, ca să mă angajez.
- Lucrez pe Windows 11, cam 2 ore pe zi. Am VS Code, GitHub Desktop și cont GitHub. Am mai folosit puțin N8N și Vercel.
- Vorbește-mi în română, simplu, pe înțelesul unui începător.
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

## Harta paginilor (propusă, de confirmat după ce le vedem)
```
/               → Pagina principală (bun venit + produse populare + categorii)
/meniu          → Meniul complet, cu filtre pe categorii
/produs/[id]    → Detalii produs: mărime, cantitate, „Adaugă în coș”
/cos            → Coșul: cantități, șterge, notă, total, „Finalizează”
/comanda        → Formular: nume + telefon
/comanda/gata   → „Comandă plasată!” + numărul comenzii
/comenzile-mele → Starea comenzilor
/despre         → Despre noi, program, locație
/login          → Cont client
/admin          → Panou admin (protejat)
```

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
- **Următorul pas:** pasul 2 (setup): proiect Next.js + Tailwind, pornit local, apoi repository pe GitHub.
