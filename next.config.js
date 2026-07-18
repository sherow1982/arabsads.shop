/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxSize: 20 * 1024 * 1024, // 20MB max per chunk
          minSize: 20000,
          cacheGroups: {
            productsData: {
              test: /[\\/]src[\\/]data[\\/]products/,
              name: false, // تقسيم تلقائي بدون اسم ثابت
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            swiper: {
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              name: 'swiper',
              chunks: 'async',
              priority: 20,
            },
            redux: {
              test: /[\\/]node_modules[\\/](@reduxjs|react-redux)[\\/]/,
              name: 'redux',
              chunks: 'all',
              priority: 15,
            },
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              name: false,
              chunks: 'all',
              priority: 10,
              maxSize: 20 * 1024 * 1024,
            },
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig
