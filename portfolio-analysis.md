# Portfolio Analysis — Putra Sitorus Personal Website

Dokumentasi lengkap mengenai proyek **Personal-Web** milik Putra Sitorus (Data Analyst & Web Developer).
Repo asal: `https://github.com/Putrabadiws/Portofolio.github.io`

---

## 1. Ringkasan Proyek

| Item | Nilai |
|------|-------|
| Nama proyek | Putra's Portofolio |
| Pemilik | Putra Sitorus (`tuansitorus0304@gmail.com`) |
| Tipe | Static Single-Page Website (one-page scroll) |
| Tech Stack | HTML5, CSS3 (vanilla), JavaScript (vanilla) |
| Build tool | Tidak ada (no bundler, no transpiler) |
| Hosting | GitHub Pages (`Portofolio.github.io`) |
| Branch utama | `master` |
| Total file source | 3 (`index.html`, `style.css`, `script.js`) + 23 aset gambar |
| Ukuran repo | ~10 MB (didominasi PNG di folder `img/`) |
| Lisensi | Tidak ada file LICENSE (semua hak dimiliki pemilik — lihat footer) |

Tujuan website: menampilkan profil personal, layanan (UI/UX, Frontend, Data Analyst), portfolio karya, dan form kontak.

---

## 2. Struktur Direktori

```
Personal-Web/
├── index.html              # Halaman tunggal — seluruh markup ada di sini
├── style.css               # Semua styling + media queries
├── script.js               # Toggle menu mobile + sticky header
└── img/                    # 23 aset (PNG, JPG, SVG)
    ├── Logo-ps.png         # Favicon
    ├── HERObackground.png  # Background hero section
    ├── face.jpg            # Foto profil di about section
    ├── s-1.svg, s-2.svg,   # Icon services (UI/UX, Frontend, Data)
    │   s-3.svg
    ├── porto-1..6.png      # Thumbnail portfolio
    ├── port-1..6.jpg       # Aset lama (tidak dipakai di index.html)
    ├── LiterasiCTRSA.png   # Thumbnail proyek LiterasiCTSA
    ├── AdminDashboard.png  # Thumbnail proyek Admin Dashboard
    └── background.png,
        HERObackground(OLD).png  # Aset lama, kandidat dihapus
```

**Catatan**: ada beberapa aset legacy (`port-1.jpg`–`port-6.jpg`, `HERObackground(OLD).png`, `background.png`) yang tidak direferensikan di `index.html` — ~700 KB ruang yang bisa dibersihkan.

---

## 3. Infrastruktur & Deployment

### 3.1 Hosting
- **GitHub Pages** dari branch `master` (default behavior — file `index.html` di root langsung di-serve).
- URL publik mengikuti naming `<user>.github.io/<repo>` atau custom domain jika dikonfigurasi.
- Tidak ada file `CNAME`, `_config.yml`, atau workflow GitHub Actions — deployment murni statis Pages.

### 3.2 Dependensi Eksternal (loaded via CDN)

| Resource | CDN | Tujuan |
|----------|-----|--------|
| Boxicons (latest) | `unpkg.com/boxicons@latest` | Icon menu hamburger (`bx-menu`, `bx-x`) |
| Remix Icon 4.1.0 | `cdn.jsdelivr.net/npm/remixicon@4.1.0` | Icon sosial media + arrow + behance/github icons |
| Google Fonts: Inter | `fonts.googleapis.com` | Font utama, weight 300–900 |
| AOS (Animate On Scroll) | `unpkg.com/aos@next` | Animasi scroll (`fade-in`, `zoom-in-up`, dll) |
| FormSubmit | `formsubmit.co` | Backend gratis untuk form contact (POST ke email) |

**Gotcha**: pemakaian `boxicons@latest` berisiko (versi bisa berubah sewaktu-waktu dan merusak UI). Sebaiknya di-pin ke versi spesifik.

### 3.3 Build & Deploy Flow
1. Edit langsung di file source (tidak ada compile step).
2. `git commit` + `git push origin master` → GitHub Pages auto-rebuild.
3. Tidak ada test, lint, atau CI gate.

---

## 4. Arsitektur

### 4.1 Pola Arsitektur
**Single-Page Static Site** — semua konten di-render server-side oleh GitHub Pages sebagai HTML statis. Tidak ada routing client-side, tidak ada API call (kecuali submit form ke FormSubmit), tidak ada state management.

### 4.2 Diagram Alur

```
┌─────────────────┐
│   Browser User  │
└────────┬────────┘
         │ GET /
         ▼
┌─────────────────────────┐
│   GitHub Pages CDN      │
│   (index.html + assets) │
└────────┬────────────────┘
         │
         ├── Load CSS (style.css)
         ├── Load JS (script.js + AOS)
         ├── Load fonts (Google Fonts)
         └── Load icons (Boxicons, Remixicon CDN)

User submit form
         │
         ▼
┌─────────────────────────┐
│  formsubmit.co          │  ──► forward ke tuansitorus0304@gmail.com
└─────────────────────────┘
```

### 4.3 Layer Tanggung Jawab

| Layer | File | Tanggung jawab |
|-------|------|----------------|
| Markup / struktur | `index.html` | Semantik HTML5, section navigation, anchor tag |
| Presentation | `style.css` | Layout (grid/flex), theming, responsive breakpoints |
| Behavior | `script.js` | Toggle menu mobile, sticky header on scroll |
| Animation | AOS lib (CDN) | Reveal-on-scroll animations |
| Form backend | FormSubmit (3rd party) | Terima POST, kirim email |

---

## 5. Routes / Navigasi

Tidak ada server-side routing. Semua navigasi adalah **anchor link** ke section di dalam halaman yang sama (smooth scroll via CSS `scroll-behavior: smooth`).

| Anchor | Target Section | Konten |
|--------|---------------|--------|
| `#home` | `<section class="hero">` | Headline, intro, social links, CTA |
| `#about` | `<section class="about">` | Foto profil, info personal, experience |
| `#services` | `<section class="services">` | 3 kartu layanan |
| `#portofolio` | `<section class="portofolio">` | 6 kartu karya (link ke Behance/Figma/GitHub) |
| `#contact` | `<section class="contact">` | Form kontak |

### 5.1 Outbound Links

| URL | Tujuan |
|-----|--------|
| `github.com/Putrabadiws` | Profil GitHub |
| `linkedin.com/in/putraabadi/` | Profil LinkedIn |
| `behance.net/putrabadiws` | Profil Behance |
| `instagram.com/putrabadiws/` | Profil Instagram |
| `drive.google.com/file/d/1HGmlfb6...` | Download CV (Google Drive) |
| 6× link portfolio | Behance, Figma, GitHub Pages eksternal |
| `formsubmit.co/tuansitorus0304@gmail.com` | Endpoint form contact |

---

## 6. Logic / Behavior

### 6.1 `script.js` — Semua client-side JS (18 baris)

```js
// 1. Sticky header on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 120);
});

// 2. Toggle mobile menu
let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');
menu.onclick = () => {
    menu.classList.toggle('bx-x');         // ganti icon hamburger → close
    navlist.classList.toggle('active');    // slide-in navlist
};

// 3. Auto-close menu saat user scroll
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};
```

**Gotcha**: `window.onscroll` di baris 15 **menimpa** behavior di baris 3 (`addEventListener`) tidak — keduanya bisa hidup berdampingan karena yang pertama pakai `addEventListener`, yang kedua pakai property assignment. Tapi assignment ke `window.onscroll` akan menimpa handler `window.onscroll` lain jika ada di masa depan. Sebaiknya konsisten pakai `addEventListener`.

### 6.2 Animasi AOS — Inisialisasi inline di `index.html`

```js
AOS.init({
    offset: 300,
    duration: 1400,
});
```

Elemen yang dianimasi pakai atribut `data-aos`:
- `data-aos="fade-in"` — hero content
- `data-aos="zoom-in-down"` — about image
- `data-aos="zoom-in-up"` — about text, services, portofolio, form
- `data-aos="fade-in-down"` / `fade-down"` — section title

### 6.3 Form Contact — Logic

- `action="https://formsubmit.co/tuansitorus0304@gmail.com"` `method="POST"`
- Hidden field `_captcha=false` (matikan reCAPTCHA)
- Hidden field `_template=box` (style email yang dikirim)
- Field: `name`, `email`, `msg` — semua `required`
- Submit → FormSubmit forward ke email pemilik

**Gotcha**:
1. Email pemilik **terekspos di HTML** (bisa di-scrape spammer). Sebaiknya pakai hashed endpoint FormSubmit (`formsubmit.co/<hash>`).
2. Attribute `name="subject"` ditulis duplikat pada input email (baris 235) — invalid HTML, hanya yang terakhir yang dibaca browser.
3. `target="_blank"` di tag `<input type="submit">` tidak ada efeknya (atribut `target` hanya valid untuk `<form>` / `<a>`).

---

## 7. Styling System

### 7.1 Design Tokens (CSS Custom Properties)

```css
:root {
    --text-color: #fff;
    --bg-color: #1b1f24;          /* dark navy */
    --second-bg-color: #22282f;    /* sedikit lebih terang */
    --main-color: #13bbff;         /* cyan — accent */
    --other-color: #c3cad5;        /* abu-abu untuk teks sekunder */

    --h1-font: 4.5rem;
    --h2-font: 2.9rem;
    --p-font: 1rem;
}
```

Tema: **dark mode** dengan accent cyan. Konsisten di semua section.

### 7.2 Layout System
- **Flexbox** untuk header, hero, about (di mobile), footer
- **CSS Grid** untuk `.about` (2 kolom), `.services-content`, `.portofolio-content` (auto-fit, minmax 300px)
- Padding section seragam: `110px 16% 90px` (top, horizontal, bottom)

### 7.3 Responsive Breakpoints

| Breakpoint | Trigger | Perubahan utama |
|------------|---------|----------------|
| `≤ 1700px` | Header padding 8% (turun dari 16%), logo 28px |
| `≤ 1380px` | Hero height 90vh |
| `≤ 1290px` | Services box padding & icon size dikurangi |
| `≤ 1240px` | About jadi 1 kolom, h1 → 4rem, h2 → 2.2rem |
| `≤ 950px` | **Mobile menu aktif** (`#menu-icon` muncul), navlist slide-in, h1 → 3.5rem |
| `≤ 680px` | Main content paragraph full-width, h-btn dikecilkan |
| `≤ 470px` | h1 → 2.1rem, about image 300×300, logo 20px |

### 7.4 Component Patterns Utama

| Selector | Pola |
|----------|------|
| `.btn` / `.btn2` | Cyan filled vs outlined, hover-swap |
| `.h-btn` | Outline button khusus header |
| `.box` (services) | Card dengan shadow cyan + hover translateY+scale |
| `.row` (portfolio) | Card serupa `.box` tapi untuk thumbnail karya |
| `.social i` | Lingkaran 40px dengan glow on hover |
| `header.sticky` | State berubah saat `window.scrollY > 120` |

---

## 8. Konten — Section by Section

### 8.1 Hero (`#home`)
- Heading: "Hi, There! I'm **Putra Sitorus**"
- Tagline: bridging data, code, dan design
- 4 social icon (GitHub, LinkedIn, Behance, Instagram)
- 2 CTA: "Hire me" (anchor `#`) dan "Download CV" (Google Drive link)
- Background: `img/HERObackground.png`

### 8.2 About (`#about`)
- Foto bulat (`img/face.jpg`) border cyan
- Data: experience 3 tahun, lokasi Jakarta, freelance Available
- Email & phone terekspos langsung di HTML (sama gotcha dengan form)

### 8.3 Services (`#services`)
Tiga kartu:
1. **UI/UX Design** — Figma, wireframe, prototype, user research
2. **Frontend Developer** — HTML/CSS/JS, maintenance, testing
3. **Data Analyst** — Python, SQL, Power BI, Tableau

**Gotcha**: tombol "Download Now" di setiap kartu ber-link `href="#"` (dead link). Harus diisi atau diganti dengan CTA yang valid.

### 8.4 Portfolio (`#portofolio`)
Enam kartu — link ke karya eksternal:

| # | Judul | Platform | Status |
|---|-------|----------|--------|
| 1 | Mobile Apps Design for Fundex | Behance | ✓ valid |
| 2 | GoodReads Mobile Apps Design | Behance | ✓ valid |
| 3 | Web Redesign for LiterasiCTSA | Behance | ⚠ link sama dengan #1 (duplikat!) |
| 4 | Wonderfull CLBS Website | GitHub Pages | ✓ valid |
| 5 | Admin Dashboard Laravel | Figma embed | ✓ valid |
| 6 | Website Design for Krealogi | Figma | ✓ valid |

**Bug**: portfolio #3 ("LiterasiCTSA") ber-link ke gallery Fundex — kemungkinan typo saat copy-paste.

### 8.5 Contact (`#contact`)
- Form 3 field + submit
- Lihat detail di section 6.3

### 8.6 Footer
- Copyright "2024 Putra Sitorus, All Rights Reserved." (perlu update tahun)
- Scroll-to-top button (anchor `#home`)

---

## 9. Issues, Gotchas & Saran Improvement

### 9.1 Bugs konkret
1. **Portfolio #3 salah link** (`LiterasiCTSA` → Fundex gallery). Lihat baris 166.
2. **Duplicate `name` attribute** pada input email (`name="email"` & `name="subject"`) — baris 235.
3. **`target="_blank"` salah tempat** pada `<input type="submit">` — baris 239.
4. **`href="#"` dead link** di "Hire me" (baris 64), "View All Projects" (baris 85), dan 3 "Download Now" di services (baris 101, 111, 121).

### 9.2 Code quality
1. **`boxicons@latest` tidak ter-pin** — risiko breaking change. Pin ke versi spesifik.
2. **Tag `<a>` tidak ditutup eksplisit** di section social hero (baris 57–60) — browser auto-close, tapi invalid HTML.
3. **CSS typo**: baris 399–400 `form input::placeholder` kehilangan koma sebelum `form textarea::placeholder` — selector kedua tidak akan apply.
4. **`window.onscroll` assignment** di `script.js` baris 15 berpotensi konflik dengan handler lain.

### 9.3 Security & Privacy
1. **Email pemilik terekspos** di 3 tempat (form action, about section, kemungkinan jadi target spam).
2. **FormSubmit captcha dimatikan** (`_captcha=false`) — rentan spam form.
3. **Tidak ada `rel="noopener noreferrer"`** pada link `target="_blank"` (potensi tab-napping security issue).

### 9.4 Performance
1. **Aset legacy** (`port-*.jpg`, `HERObackground(OLD).png`, `background.png`) sekitar 700 KB tidak dipakai — hapus.
2. **PNG portfolio besar** (`AdminDashboard.png` ~1 MB, `porto-4.png` ~750 KB) — convert ke WebP atau resize.
3. **Tidak ada lazy-loading** pada gambar portfolio — tambahkan `loading="lazy"`.
4. **Total page weight didominasi gambar** (~6 MB di `img/`).

### 9.5 Accessibility
1. **Banyak `<img>` tanpa `alt`** — gagal screen reader.
2. **Social icon tidak punya teks alternatif** (`aria-label`).
3. **Form input tanpa `<label>`** — placeholder bukan pengganti label untuk a11y.

### 9.6 SEO
1. **Tidak ada `<meta name="description">`** dan **Open Graph tags**.
2. **Title generic** ("Putra's Portofolio" — typo "Portofolio" vs "Portfolio").
3. **Tidak ada `robots.txt`, `sitemap.xml`**.

---

## 10. Git History Insight

Branch: `master` (clean). 20 commit terakhir 100% adalah "Update index.html" / "Update style.css" — pola development direct-to-master tanpa branching. Tidak ada PR workflow. Tidak ada commit conventional/semantic.

---

## 11. Quick Wins (urutan prioritas)

1. **Fix bugs konkret di 9.1** — semua quick, < 30 menit total.
2. **Tambahkan `alt` ke semua `<img>`** — a11y + SEO.
3. **Pin versi `boxicons`** ke versi spesifik.
4. **Hapus aset legacy** di `img/` — kurangi ukuran repo.
5. **Tambahkan meta description + OG tags** untuk preview di sosial media.
6. **Pakai hashed FormSubmit endpoint** + enable captcha.
7. **Convert PNG besar ke WebP**, tambahkan `loading="lazy"`.
8. **Update copyright tahun** di footer.
9. **Tambahkan `rel="noopener noreferrer"`** ke semua link `target="_blank"`.
10. **Setup GitHub Actions** untuk basic HTML/CSS linting (optional).
