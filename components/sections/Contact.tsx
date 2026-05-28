"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { sendEmail } from "@/lib/sendEmail";
import type { ContactFormState } from "@/types";

const initialState: ContactFormState = { status: "idle" };

export default function Contact() {
  const [state, action, pending] = useActionState(sendEmail, initialState);

  return (
    <section id="contact" className="section-pad">
      <SectionTitle prefix="Contact" accent="Me" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 1.4 }}
        className="flex items-center justify-center mt-[4.2rem]"
      >
        <form action={action} className="relative w-[600px] max-w-full">
          <div className="mb-5">
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full p-5 bg-bg-card text-white rounded-lg outline-none shadow-accent-sm placeholder:text-muted placeholder:text-[15px]"
            />
            {state.errors?.name && (
              <p className="mt-1 text-sm text-red-400">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address.."
              required
              className="w-full p-5 bg-bg-card text-white rounded-lg outline-none shadow-accent-sm placeholder:text-muted placeholder:text-[15px]"
            />
            {state.errors?.email && (
              <p className="mt-1 text-sm text-red-400">{state.errors.email[0]}</p>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              cols={30}
              rows={10}
              placeholder="Write Message Here.."
              required
              className="w-full p-5 bg-bg-card text-white rounded-lg outline-none shadow-accent-sm placeholder:text-muted placeholder:text-[15px]"
            />
            {state.errors?.message && (
              <p className="mt-1 text-sm text-red-400">{state.errors.message[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="px-[26px] py-[11px] bg-accent text-bg border-2 border-accent rounded-lg text-[15px] font-semibold w-[30%] max-[680px]:w-[35%] max-[470px]:w-1/2 hover:bg-transparent hover:text-accent hover:shadow-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
          >
            {pending ? "Sending..." : "Send Message"}
          </button>

          {state.status === "success" && (
            <p className="mt-4 text-accent">{state.message}</p>
          )}
          {state.status === "error" && !state.errors && (
            <p className="mt-4 text-red-400">{state.message}</p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
