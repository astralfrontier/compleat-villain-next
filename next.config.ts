import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTJS_ROOT: __dirname,
  },
};

export default nextConfig;
