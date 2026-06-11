"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaBehance, FaGithub, FaFigma } from "react-icons/fa";
import type { PortfolioItem } from "@/types";

const PLATFORM_ICON = {
  behance: FaBehance,
  github: FaGithub,
  figma: FaFigma,
};

type Props = {
  items: PortfolioItem[];
};

export default function PortfolioGrid({ items }: Props) {
  return (
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
      {items.map((item) => {
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
  );
}
