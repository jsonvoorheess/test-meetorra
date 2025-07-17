/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig; 