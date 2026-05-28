"use client";

import { motion } from "framer-motion";

type Props = {
  prefix: string;
  accent: string;
  className?: string;
};

export default function SectionTitle({ prefix, accent, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // once:false → replay tiap re-enter; margin bottom 200px → trigger ~AOS offset:300
      viewport={{ once: false, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 1.4 }}
      className={`text-center ${className}`}
    >
      <h2 className="text-h2 font-bold">
        {prefix} <span className="text-accent">{accent}</span>
      </h2>
    </motion.div>
  );
}
