import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  env: {
    NEXTJS_ROOT: __dirname,
  },
};

export default nextConfig;
