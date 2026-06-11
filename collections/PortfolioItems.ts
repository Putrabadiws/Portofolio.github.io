import type { CollectionConfig } from "payload";

// Mapping ke tipe PortfolioItem di types/index.ts:
//   image    -> upload relationship ke Media (di FE diakses via .url)
//   category -> text (UI/UX Design, Website Development, dst)
//   title    -> text
//   href     -> text (URL eksternal Behance/GitHub/Figma)
//   platform -> select ("behance" | "github" | "figma")
//   order    -> number (untuk sort manual; default urut createdAt desc)
export const PortfolioItems: CollectionConfig = {
  slug: "portfolio-items",
  labels: {
    singular: "Portfolio Item",
    plural: "Latest Portofolio",
  },
  access: {
    read: () => true, // public read — landing page perlu data tanpa auth
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "platform", "order", "updatedAt"],
    listSearchableFields: ["title", "category"],
  },
  defaultSort: "order",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "text",
      required: true,
      admin: {
        description: "Mis. \"UI/UX Design\", \"Website Development\".",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "href",
      type: "text",
      required: true,
      admin: {
        description: "URL eksternal ke proyek (Behance, GitHub, Figma).",
      },
    },
    {
      name: "platform",
      type: "select",
      required: true,
      options: [
        { label: "Behance", value: "behance" },
        { label: "GitHub", value: "github" },
        { label: "Figma", value: "figma" },
      ],
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Urutan tampil di landing page (ascending). Item baru = 0.",
      },
    },
  ],
};
