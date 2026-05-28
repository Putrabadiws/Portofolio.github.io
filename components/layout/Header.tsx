"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portofolio", label: "Portofolio" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Sticky on scroll — mirror script.js lama (threshold 120px)
    const onScroll = () => {
      setSticky(window.scrollY > 120);
      // Auto-close mobile menu saat scroll (perilaku window.onscroll lama)
      setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 w-full z-[1000] flex items-center justify-between transition-all duration-500
        ${sticky
          ? "bg-bg shadow-[0_0.1rem_1rem_rgba(0,0,0,0.2)] py-4 px-[16%] max-[1700px]:px-[8%]"
          : "bg-transparent py-[40px] px-[16%] max-[1700px]:px-[8%]"
        }`}
    >
      <Link href="#" className="text-[36px] max-[1700px]:text-[28px] max-[470px]:text-[20px] font-semibold">
        Data & <span className="text-accent">Developer</span>
      </Link>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="hidden max-[950px]:block text-[33px] max-[680px]:text-[28px] cursor-pointer z-[10001] absolute right-[11px] top-1/2 -translate-y-1/2"
      >
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      <ul
        className={`flex max-[950px]:absolute max-[950px]:top-full max-[950px]:w-[255px] max-[950px]:min-h-screen
          max-[950px]:flex-col max-[950px]:bg-bg transition-all duration-500
          ${menuOpen ? "max-[950px]:right-0" : "max-[950px]:-right-full"}`}
      >
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-muted ml-[40px] max-[950px]:block max-[950px]:p-[17px] max-[950px]:text-[22px] max-[950px]:ml-0 hover:text-accent hover:[text-shadow:3px_3px_20px_#13bbff,1px_1px_30px_#fff] transition-all duration-500"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="max-[950px]:relative max-[950px]:right-[15px]">
        <a
          href="#contact"
          className="inline-block px-[26px] py-[11px] max-[680px]:px-[10px] max-[680px]:py-2 bg-transparent text-accent border-2 max-[680px]:border border-accent rounded-lg max-[680px]:rounded-md text-[15px] font-semibold hover:bg-accent hover:text-bg hover:shadow-accent hover:scale-110 transition-all duration-500"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}
