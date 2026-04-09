import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Explicitly set the root directory to avoid lockfile conflicts
  turbopack: {
    root: __dirname,
  },
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
