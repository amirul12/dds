import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Explicitly set turbopack config to avoid workspace root detection issues
  turbopack: {},
  // cacheComponents: true,
  images: {
    ...(process.env.NODE_ENV === 'development' && {
      unoptimized: true,
    }),
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',  // Allows images from your production Strapi URL
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
