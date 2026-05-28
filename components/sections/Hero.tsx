"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaBehance, FaInstagram } from "react-icons/fa";
import Button from "@/components/ui/Button";
import type { SocialLink } from "@/types";

const SOCIALS: SocialLink[] = [
  { href: "https://github.com/Putrabadiws", icon: "github", label: "GitHub" },
  { href: "https://www.linkedin.com/in/putraabadi/", icon: "linkedin", label: "LinkedIn" },
  { href: "https://www.behance.net/putrabadiws", icon: "behance", label: "Behance" },
  { href: "https://www.instagram.com/putrabadiws/", icon: "instagram", label: "Instagram" },
];

const ICON_MAP = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  behance: FaBehance,
  instagram: FaInstagram,
};

const CV_URL =
  "https://drive.google.com/file/d/1HGmlfb6OHiZCb4wum8POSntrdKH7Vg2u/view?usp=drive_link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center px-[16%] max-[1700px]:px-[8%] max-[1380px]:h-[90vh]"
    >
      {/* Image as background — next/image agar dapat optimasi & lazy decoded */}
      <Image
        src="/img/HERObackground.png"
        alt=""
        fill
        priority
        className="object-cover object-center -z-10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h4 className="text-[1.6rem]">Hi, There!</h4>
        <h1 className="text-h1 my-5">
          I&apos;m <span className="text-accent">Putra Sitorus</span>
        </h1>
        <p className="text-base text-muted max-w-[620px] leading-[30px] mb-[15px]">
          Bridging the gap between data, code, and design. As a Data Analyst and
          experienced Web Developer, I don&apos;t just analyze numbers, I build the
          systems that collect them and the visualizations that make them speak.
          Dedicated to driving informed decision-making through technical excellence.
        </p>

        <div className="mb-10 max-[950px]:mb-5">
          {SOCIALS.map((s) => {
            const Icon = ICON_MAP[s.icon];
            return (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex items-center justify-center w-10 h-10 text-accent rounded-full backdrop-brightness-[88%] text-[20px] mr-[17px] cursor-pointer hover:scale-110 hover:shadow-accent transition-all duration-500"
              >
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-[15px]">
          <Button href="#contact" variant="filled">
            Hire me
          </Button>
          <Button href={CV_URL} variant="outline" external>
            Download CV
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
