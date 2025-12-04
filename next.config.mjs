/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi gambar
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Optimasi production build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Modern JavaScript tanpa transpilasi berlebihan
  swcMinify: true,
  
  // Kompresi
  compress: true,
  
  // Optimasi untuk performa
  reactStrictMode: true,
  
  // Optimasi bundling
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
