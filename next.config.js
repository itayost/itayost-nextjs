/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Support for RTL
  i18n: {
    locales: ['he', 'en'],
    defaultLocale: 'he',
  },
}

module.exports = nextConfig
