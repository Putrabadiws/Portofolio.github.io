import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Vercel Blob domain — supaya next/image bisa optimize media yang di-upload via Payload.
    // Kalau pindah ke Cloudinary/S3, ganti hostname di sini.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

// withPayload bind admin webpack/turbopack rules + alias @payload-config.
// devBundleServerPackages=false untuk dev speed; biarkan default kalau build prod bermasalah.
export default withPayload(nextConfig, { devBundleServerPackages: false });
