/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false; // Add this if not using Turbopack
    return config;
  },
};

export default nextConfig;
