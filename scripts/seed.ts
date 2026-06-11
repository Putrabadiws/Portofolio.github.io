/**
 * Seed script — migrasi 6 portfolio item statis (versi sebelumnya hardcoded di
 * components/sections/Portfolio.tsx) ke koleksi Payload.
 *
 * Cara jalankan:
 *   1. Pastikan .env terisi DATABASE_URI + PAYLOAD_SECRET + BLOB_READ_WRITE_TOKEN
 *   2. Buat user admin pertama lewat http://localhost:3000/admin (UI Payload)
 *   3. npm run seed
 *
 * Idempotent: cek title sebelum insert, jadi aman dijalankan ulang.
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

import { getPayload } from "payload";
import config from "../payload.config";
import type { PortfolioItem } from "../types";

const filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(filename), "..");

type SeedItem = PortfolioItem & { imagePath: string };

const ITEMS: SeedItem[] = [
  {
    imagePath: "public/img/porto-1.png",
    image: "porto-1.png",
    category: "UI/UX Design",
    title: "Mobile Apps Design for Fundex",
    href: "https://www.behance.net/gallery/180507283/UIUX-Designer-FundEx-X-Rakamin-Academy",
    platform: "behance",
  },
  {
    imagePath: "public/img/porto-2.png",
    image: "porto-2.png",
    category: "UI/UX Design",
    title: "GoodReads Mobile Apps Design",
    href: "https://www.behance.net/gallery/179718957/Creating-Eye-Catching-Graphics-by-Rakamin-X-goodreads",
    platform: "behance",
  },
  {
    imagePath: "public/img/LiterasiCTRSA.png",
    image: "LiterasiCTRSA.png",
    category: "UI/UX Design",
    title: "Web Redesign for LiterasiCTSA",
    href: "#", // TODO: ganti dengan URL Behance/Figma asli untuk proyek LiterasiCTSA
    platform: "behance",
  },
  {
    imagePath: "public/img/porto-4.png",
    image: "porto-4.png",
    category: "Website Development",
    title: "Wonderfull CLBS Website",
    href: "https://putrabadiws.github.io/PutraBlog.github.io/",
    platform: "github",
  },
  {
    imagePath: "public/img/AdminDashboard.png",
    image: "AdminDashboard.png",
    category: "Website Development",
    title: "Admin Dashboard Laravel",
    href: "https://embed.figma.com/proto/TBTQSL2udte5V7FTjeJqww/WEb-HKI?page-id=144%3A2&node-id=144-3&viewport=982%2C1272%2C0.52&scaling=min-zoom&content-scaling=fixed&embed-host=share",
    platform: "figma",
  },
  {
    imagePath: "public/img/porto-6.png",
    image: "porto-6.png",
    category: "Website Design",
    title: "Website Design for Krealogi",
    href: "https://www.figma.com/file/aLrfzBvg4cz1QmwqbmEh8e/KREALOGI?type=design&node-id=0%3A1&mode=design&t=37KjPV4NDlqKHkzn-1",
    platform: "figma",
  },
];

async function run() {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    console.error("✗ DATABASE_URI / PAYLOAD_SECRET belum diset di .env");
    process.exit(1);
  }

  const payload = await getPayload({ config });

  console.log("→ Seeding portfolio items...");

  for (let i = 0; i < ITEMS.length; i += 1) {
    const item = ITEMS[i];

    // Skip kalau title sudah ada — idempotent.
    const existing = await payload.find({
      collection: "portfolio-items",
      where: { title: { equals: item.title } },
      limit: 1,
    });
    if (existing.docs.length > 0) {
      console.log(`  • [skip] "${item.title}" sudah ada`);
      continue;
    }

    // Upload image dulu — Payload terima Buffer lewat field `data` + filename.
    const absImagePath = path.join(projectRoot, item.imagePath);
    const fileBuffer = await fs.readFile(absImagePath);
    const filename = path.basename(item.imagePath);

    const mediaDoc = await payload.create({
      collection: "media",
      data: { alt: item.title },
      file: {
        data: fileBuffer,
        mimetype: filename.endsWith(".png") ? "image/png" : "image/jpeg",
        name: filename,
        size: fileBuffer.length,
      },
    });

    await payload.create({
      collection: "portfolio-items",
      data: {
        title: item.title,
        category: item.category,
        href: item.href,
        platform: item.platform,
        image: mediaDoc.id,
        order: i,
      },
    });

    console.log(`  ✓ inserted "${item.title}"`);
  }

  console.log("✓ Seed selesai");
  process.exit(0);
}

run().catch((err) => {
  console.error("✗ Seed gagal:", err);
  process.exit(1);
});
