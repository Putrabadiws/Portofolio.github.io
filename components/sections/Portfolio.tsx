"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBehance, FaGithub, FaFigma } from "react-icons/fa";
import SectionTitle from "@/components/ui/SectionTitle";
import type { PortfolioItem } from "@/types";

// NOTE: fix bug versi statis — LiterasiCTSA sebelumnya ber-link ke Fundex gallery.
// Untuk sementara href dibiarkan sebagai placeholder "#" dengan TODO; ganti dengan URL asli.
const ITEMS: PortfolioItem[] = [
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

const PLATFORM_ICON = {
  behance: FaBehance,
  github: FaGithub,
  figma: FaFigma,
};

export default function Portfolio() {
  return (
    <section id="portofolio" className="section-pad bg-bg-secondary">
      <SectionTitle prefix="Latest" accent="Portofolio" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px 0px 200px 0px" }}
        // Parent koordinator — stagger 150ms per card; 6 item jadi total ~0.9s
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-[2.3rem] mt-[4.2rem]"
      >
        {ITEMS.map((item) => {
          const Icon = PLATFORM_ICON[item.platform];
          return (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.4 } },
              }}
              className="block bg-bg-card rounded-[28px] border border-transparent shadow-accent-sm p-5 hover:border-accent hover:-translate-y-[5px] hover:scale-[1.03] transition-all duration-500"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={350}
                className="w-full h-auto rounded-[28px] mb-[1.4rem]"
              />
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-[20px] font-semibold text-muted">{item.category}</h5>
                <span className="inline-flex items-center justify-center w-[55px] h-[55px] text-[17px] rounded-full text-white bg-accent-alt">
                  <Icon />
                </span>
              </div>
              <h4 className="text-[25px] font-bold leading-[1.4] mb-[10px]">{item.title}</h4>
            </motion.a>
          );
        })}
      </motion.div>
    </section>
  );
}
