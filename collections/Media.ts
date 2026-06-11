import type { CollectionConfig } from "payload";

// Media collection — upload target untuk semua image (portfolio thumbnails, dst).
// Storage adapter (Vercel Blob) di-bind di payload.config.ts via plugin, jadi koleksi
// ini tidak perlu menyentuh staticDir.
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true, // public read — image dipakai di landing page
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Teks alternatif untuk accessibility & SEO.",
      },
    },
  ],
};
