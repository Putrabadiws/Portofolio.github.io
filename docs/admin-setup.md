# Admin Dashboard Setup

Dashboard CRUD untuk section **Latest Portofolio**. Pakai [Payload CMS v3](https://payloadcms.com) embedded di route `/admin`.

## Stack

- **CMS:** Payload v3 (Next.js native integration)
- **DB:** Neon Postgres (serverless)
- **Storage:** Vercel Blob (untuk image upload)
- **Auth:** email + password (Payload built-in), 1 user = pemilik

## Required env vars

Copy `.env.example` ke `.env.local` lalu isi:

| Var | Sumber |
|---|---|
| `PAYLOAD_SECRET` | Generate: `openssl rand -base64 32` |
| `DATABASE_URI` | Neon dashboard (lihat langkah 1 di bawah) |
| `BLOB_READ_WRITE_TOKEN` | Vercel project (lihat langkah 2 di bawah) |

## 1. Setup Neon Postgres (DB)

1. Sign up di [neon.tech](https://neon.tech) (gratis 0.5 GB)
2. Create project — region terdekat (Singapore untuk Indonesia)
3. Dashboard → **Connection string** → copy yang **Pooled connection** (cocok untuk serverless)
4. Paste ke `DATABASE_URI` di `.env.local`

Contoh: `postgresql://user:pass@ep-xxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

## 2. Setup Vercel Blob (image storage)

1. Push project ke Vercel dulu (kalau belum) — biar bisa attach Blob store ke project
2. Vercel dashboard → project → **Storage** tab → **Create Database** → **Blob**
3. Setelah created → **.env.local** tab → copy `BLOB_READ_WRITE_TOKEN`
4. Paste ke `.env.local`

Local dev butuh token ini juga, jadi sekalian masukkan ke `.env.local`.

## 3. First-time setup

```bash
npm install
npm run dev
```

Buka `http://localhost:3000/admin`. Payload akan minta create first user (admin). Set email + password.

## 4. Seed 6 portfolio item lama

Setelah admin user terbuat:

```bash
npm run seed
```

Script ini upload 6 image dari `public/img/` ke Vercel Blob, dan insert 6 record ke `portfolio-items` collection. Idempotent — aman dijalankan ulang (skip kalau title sudah ada).

## 5. Pakai dashboard

- `http://localhost:3000/admin` → login
- **Latest Portofolio** di sidebar → CRUD operations
- Form `image` → drag & drop file gambar (auto-upload ke Vercel Blob)
- Field `order` → kontrol urutan tampil di landing page (ascending)
- Landing page (`/`) auto-revalidate 60 detik sekali (lihat `revalidate` di `components/sections/Portfolio.tsx`)

## 6. Production deploy

Set env vars yang sama (`PAYLOAD_SECRET`, `DATABASE_URI`, `BLOB_READ_WRITE_TOKEN`) di Vercel project settings. Build otomatis bikin schema di Neon Postgres on first deploy.

## File structure

```
collections/
  PortfolioItems.ts    # Schema portfolio (title, category, image, href, platform, order)
  Media.ts             # Schema upload (image + alt text)
  Users.ts             # Admin auth (email + password bawaan Payload)
payload.config.ts      # Root config (DB + storage + collections)
app/(payload)/
  admin/               # Admin UI (/admin)
  api/                 # Payload REST + GraphQL (/api/*)
components/sections/
  Portfolio.tsx        # Server component — fetch dari Payload, fallback ke static items
  PortfolioGrid.tsx    # Client component — framer-motion grid (markup lama)
scripts/seed.ts        # Migrasi 6 item statis ke CMS
```

## Fallback behavior

Kalau `DATABASE_URI` / `PAYLOAD_SECRET` kosong, atau Payload melempar error (DB down, dst), landing page **otomatis fallback** ke 6 item statis lama. Jadi setup setengah jadi pun landing tidak pernah blank.

## Troubleshooting

- **`/admin` 500 error** → cek `DATABASE_URI` & `PAYLOAD_SECRET` di `.env.local`, lalu restart `npm run dev`
- **Upload image gagal** → cek `BLOB_READ_WRITE_TOKEN` dan kuota Vercel Blob (1 GB gratis)
- **Landing page masih nampak data lama padahal sudah diedit di admin** → tunggu max 60 detik (cache `revalidate`), atau hard refresh
- **Seed gagal "duplicate key"** → seed sudah idempotent; kalau tetap error, drop tabel `portfolio-items` di Neon dan rerun
