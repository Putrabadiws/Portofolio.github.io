import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "filled" | "outline";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const baseStyles =
  "inline-block px-[26px] py-[11px] rounded-[15px] border-2 border-accent font-semibold transition-all duration-500";
const variantStyles: Record<Variant, string> = {
  filled:
    "bg-accent text-bg hover:bg-transparent hover:text-accent hover:shadow-accent",
  outline:
    "bg-transparent text-accent hover:bg-accent hover:text-bg hover:shadow-accent",
};

export default function Button({
  href,
  external = false,
  variant = "filled",
  className = "",
  children,
  ...rest
}: ButtonAsLink) {
  const cls = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  // External link → anchor biasa dengan rel security (gotcha tab-napping di analisis lama)
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
