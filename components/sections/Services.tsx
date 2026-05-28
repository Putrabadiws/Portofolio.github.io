"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Service } from "@/types";

const SERVICES: Service[] = [
  {
    icon: "/img/s-1.svg",
    title: "UI/UX Design",
    description:
      "Creating user interface designs using Figma, conducting user research, creating wireframes and prototypes, and conducting testing on the developed products.",
  },
  {
    icon: "/img/s-2.svg",
    title: "Frontend Developer",
    description:
      "Designing interactive user interfaces utilizing HTML, CSS, and JavaScript, overseeing maintenance and conducting testing throughout the project lifecycle.",
  },
  {
    icon: "/img/s-3.svg",
    title: "Data Analyst",
    description:
      "Analyzing datasets using Python and SQL to extract valuable insights, creating visualizations using tools such as Power BI and Tableau to support business decisions.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <SectionTitle prefix="My" accent="Services" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "0px 0px 200px 0px" }}
        // Parent koordinator — stagger 200ms per child supaya card muncul beruntun
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="grid grid-cols-[repeat(auto-fit,minmax(300px,auto))] gap-[2.3rem] mt-[4.2rem]"
      >
        {SERVICES.map((s) => (
          <motion.div
            key={s.title}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.4 } },
            }}
            className="p-[80px_40px_66px] max-[1290px]:p-[40px_40px_46px] bg-bg-card rounded-[28px] border border-transparent shadow-accent-sm hover:border-accent hover:-translate-y-[5px] hover:scale-[1.03] transition-all duration-500 cursor-pointer"
          >
            <Image
              src={s.icon}
              alt=""
              width={80}
              height={80}
              className="mb-5 max-[1290px]:w-[60px] max-[1290px]:h-[60px]"
            />
            <h3 className="text-[30px] max-[1290px]:text-[21px] font-bold mb-[10px]">
              {s.title}
            </h3>
            <p className="text-base text-muted leading-[30px] mb-5">{s.description}</p>
            <span className="inline-flex items-center text-[22px] font-bold py-[7px] border-b-2 border-[#5d6c83] hover:border-accent transition-all duration-500">
              Learn More
              <RiArrowRightLine className="ml-1 text-[25px] text-accent align-middle" />
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
