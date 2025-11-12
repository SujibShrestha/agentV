import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript:{
ignoreBuildErrors:true
  },
  images: {
    remotePatterns: [
      {hostname: 'img.clerk.com' },
    ]
  }
  /* config options here */
};

export default nextConfig;
