import Link from "next/link";
import { RiArrowUpSFill } from "react-icons/ri";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-[16%] py-[22px] max-[1700px]:px-[8%] bg-bg-secondary flex items-center justify-between gap-8">
      <p className="text-[15px] text-muted">
        {year} Putra Sitorus, All Rights Reserved.
      </p>
      <Link
        href="#home"
        aria-label="Scroll to top"
        className="inline-flex items-center justify-center bg-accent-alt w-[45px] h-[45px] rounded-full text-white text-[27px]"
      >
        <RiArrowUpSFill />
      </Link>
    </footer>
  );
}
