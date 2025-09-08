// next.config.js - Fixed configuration for ITAYOST project

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js and other packages
  transpilePackages: ["three"],
  
  // Image optimization settings
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Webpack configuration for 3D libraries
  webpack: (config) => {
    // Handle Three.js and other 3D libraries
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/models/",
          outputPath: "static/models/",
        },
      },
    });

    // Handle shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });

    return config;
  },

  // Experimental features
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["three"],
  },

  // Environment variables
  env: {
    CUSTOM_KEY: "value",
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },

  // Redirects for proper routing
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;