/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimasi gambar
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optimasi production build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Kompresi
  compress: true,
  
  // Optimasi untuk performa
  reactStrictMode: true,
  
  // Optimasi bundling dan code splitting
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'react-hot-toast'],
  },
  
  // Optimasi untuk production
  poweredByHeader: false,
  
  // Headers untuk DNS prefetch
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
        ],
      },
    ]
  },
};

export default nextConfig;
