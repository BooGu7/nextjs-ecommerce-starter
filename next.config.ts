import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { redirects as redirectRules } from "./src/lib/redirects";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   { protocol: "https", hostname: "cdn.example.com" },
    // ],
  },

  // ✅ FIX HMR / LAN ACCESS ERROR
  allowedDevOrigins: [
    "192.168.100.76",
  ],

  async redirects() {
    return redirectRules;
  },
};

export default withNextIntl(nextConfig);