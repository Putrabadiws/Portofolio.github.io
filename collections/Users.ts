import type { CollectionConfig } from "payload";

// Users collection — Payload menyediakan field email + password otomatis lewat auth: true.
// Single-tenant: nanti diisi 1 user (pemilik portfolio) lewat seed/first-run setup.
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};
