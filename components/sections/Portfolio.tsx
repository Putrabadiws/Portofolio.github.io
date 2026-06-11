import { getPayload } from "payload";
import config from "@payload-config";

import SectionTitle from "@/components/ui/SectionTitle";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import type { PortfolioItem } from "@/types";

// Fallback statis — dipakai kalau:
//   1. DATABASE_URI/PAYLOAD_SECRET belum diset (mis. local pertama kali setup), atau
//   2. fetch Payload melempar error (DB down, dst).
// Tujuannya: landing page tidak pernah blank meskipun CMS bermasalah.
// NOTE: fix bug versi statis — LiterasiCTSA sebelumnya ber-link ke Fundex gallery.
// Untuk sementara href dibiarkan sebagai placeholder "#" dengan TODO; ganti dengan URL asli.
const FALLBACK_ITEMS: PortfolioItem[] = [
  {
    image: "/img/porto-1.png",
    category: "UI/UX Design",
    title: "Mobile Apps Design for Fundex",
    href: "https://www.behance.net/gallery/180507283/UIUX-Designer-FundEx-X-Rakamin-Academy",
    platform: "behance",
  },
  {
    image: "/img/porto-2.png",
    category: "UI/UX Design",
    title: "GoodReads Mobile Apps Design",
    href: "https://www.behance.net/gallery/179718957/Creating-Eye-Catching-Graphics-by-Rakamin-X-goodreads",
    platform: "behance",
  },
  {
    image: "/img/LiterasiCTRSA.png",
    category: "UI/UX Design",
    title: "Web Redesign for LiterasiCTSA",
    href: "#", // TODO: ganti dengan URL Behance/Figma asli untuk proyek LiterasiCTSA
    platform: "behance",
  },
  {
    image: "/img/porto-4.png",
    category: "Website Development",
    title: "Wonderfull CLBS Website",
    href: "https://putrabadiws.github.io/PutraBlog.github.io/",
    platform: "github",
  },
  {
    image: "/img/AdminDashboard.png",
    category: "Website Development",
    title: "Admin Dashboard Laravel",
    href: "https://embed.figma.com/proto/TBTQSL2udte5V7FTjeJqww/WEb-HKI?page-id=144%3A2&node-id=144-3&viewport=982%2C1272%2C0.52&scaling=min-zoom&content-scaling=fixed&embed-host=share",
    platform: "figma",
  },
  {
    image: "/img/porto-6.png",
    category: "Website Design",
    title: "Website Design for Krealogi",
    href: "https://www.figma.com/file/aLrfzBvg4cz1QmwqbmEh8e/KREALOGI?type=design&node-id=0%3A1&mode=design&t=37KjPV4NDlqKHkzn-1",
    platform: "figma",
  },
];

// Cache 60s — Payload data jarang berubah; mengurangi roundtrip DB di hot path landing page.
// Kalau perlu instant refresh setelah edit di /admin, ganti ke revalidate=0 atau panggil
// revalidatePath("/") di hook afterChange Payload.
export const revalidate = 60;

type PayloadPortfolio = {
  id: string | number;
  title: string;
  category: string;
  href: string;
  platform: PortfolioItem["platform"];
  image: { url?: string | null } | string | number | null;
};

async function fetchItems(): Promise<PortfolioItem[]> {
  if (!process.env.DATABASE_URI || !process.env.PAYLOAD_SECRET) {
    return FALLBACK_ITEMS;
  }
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "portfolio-items",
      limit: 50,
      sort: "order",
      depth: 1, // populate field image -> Media doc
    });

    const items: PortfolioItem[] = (docs as PayloadPortfolio[])
      .map((doc) => {
        const imageUrl =
          typeof doc.image === "object" && doc.image && "url" in doc.image
            ? doc.image.url ?? null
            : null;
        if (!imageUrl) return null;
        return {
          image: imageUrl,
          category: doc.category,
          title: doc.title,
          href: doc.href,
          platform: doc.platform,
        } satisfies PortfolioItem;
      })
      .filter((x): x is PortfolioItem => x !== null);

    return items.length > 0 ? items : FALLBACK_ITEMS;
  } catch (err) {
    // Payload belum terkonek / DB down — jangan crash landing page, log saja.
    console.error("[Portfolio] failed to fetch from Payload, using fallback:", err);
    return FALLBACK_ITEMS;
  }
}

export default async function Portfolio() {
  const items = await fetchItems();

  return (
    <section id="portofolio" className="section-pad bg-bg-secondary">
      <SectionTitle prefix="Latest" accent="Portofolio" />
      <PortfolioGrid items={items} />
    </section>
  );
}
