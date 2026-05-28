"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const FACTS = [
  { label: "Experience", value: "3 Years" },
  { label: "Specialty", value: "Website" },
  { label: "Address", value: "Jakarta, Indonesia" },
  { label: "Email", value: "tuansitorus0304@gmail.com" },
  { label: "Phone", value: "085210118025" },
  { label: "Freelance", value: "Available" },
];

export default function About() {
  return (
    <section
      id="about"
      className="section-pad bg-bg-secondary grid grid-cols-2 max-[1240px]:grid-cols-1 max-[1240px]:text-center items-center gap-4 max-[1240px]:gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 1.4 }}
        className="flex justify-center"
      >
        <Image
          src="/img/face.jpg"
          alt="Putra Sitorus portrait"
          width={400}
          height={400}
          className="w-full max-w-[400px] h-[400px] max-[470px]:max-w-[300px] max-[470px]:h-[300px] rounded-full object-cover border-[7px] border-accent shadow-accent"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 1.4 }}
      >
        <h2 className="text-h2 font-bold mb-5">
          I am Data <span className="text-accent">Analyst</span> <br />& Web Developer
        </h2>
        <div className="mb-[50px]">
          {FACTS.map((f) => (
            <p key={f.label} className="font-semibold text-[19px] leading-[42px]">
              {f.label} : <span className="text-muted text-base font-normal ml-2">{f.value}</span>
            </p>
          ))}
        </div>
        <Button href="#portofolio" variant="filled">
          View All Projects
        </Button>
      </motion.div>
    </section>
  );
}
