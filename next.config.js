// next.config.js - Fixed configuration without conflicts

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js and related packages
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  
  // Image optimization settings
  images: {
    domains: ["localhost"],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Webpack configuration for 3D libraries
  webpack: (config, { isServer }) => {
    // Handle GLSL/shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader"],
    });

    // Handle 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    // Fix for Three.js and server-side rendering
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Remove experimental.serverComponentsExternalPackages entirely
  // or don't include 'three' in it
  experimental: {
    // Remove this line: serverComponentsExternalPackages: ["three"],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
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

  // Rewrites (if needed)
  async rewrites() {
    return [];
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // React strict mode for better debugging
  reactStrictMode: true,

  // SWC minification (faster than Terser)
  swcMinify: true,

  // Output configuration
  output: "standalone",
};

module.exports = nextConfig;