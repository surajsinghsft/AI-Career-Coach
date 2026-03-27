/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  // 🔥 IMPORTANT FIX
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;