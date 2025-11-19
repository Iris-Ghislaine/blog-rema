// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'your-supabase-project.supabase.co',
      'res.cloudinary.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;