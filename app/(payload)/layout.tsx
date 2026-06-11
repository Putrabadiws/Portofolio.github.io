/* eslint-disable @next/next/no-css-tags */
/* THIS FILE WAS GENERATED FOR PAYLOAD ADMIN — jangan tambah font/global style dari root
   layout di sini supaya admin UI Payload tidak ke-overwrite Tailwind/font kustom kita. */
import config from "@payload-config";
import "@payloadcms/next/css";
// handleServerFunctions ada di /layouts (bukan /utilities) sejak Payload 3.x.
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import React from "react";

import { importMap } from "./admin/importMap.js";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
