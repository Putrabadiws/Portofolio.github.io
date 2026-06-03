import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Putra Sitorus — Data Analyst & Web Developer",
  description:
    "Personal portfolio of Putra Sitorus — Data Analyst & Web Developer based in Jakarta. Bridging data, code, and design through technical excellence.",
  keywords: ["Putra Sitorus", "Data Analyst", "Web Developer", "UI/UX Designer", "Jakarta"],
  authors: [{ name: "Putra Sitorus" }],
  // Favicon: Next.js auto-detects app/icon.png with cache-busting hash.
  // Why not metadata.icons + /img/logo-ps.png: file 4.6 MB ditolak browser sebagai favicon,
  // dan URL statis bikin update kontennya nggak ke-pickup karena cache.
  openGraph: {
    title: "Putra Sitorus — Data Analyst & Web Developer",
    description: "Personal portfolio of Putra Sitorus — Data Analyst & Web Developer.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
