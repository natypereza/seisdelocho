const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // /es and /nl were live before the site moved to English only. Send those
  // URLs to their English equivalent instead of serving a 404 to anyone
  // arriving from a bookmark or a search result.
  async redirects() {
    return [
      {
        source: '/:locale(es|nl)',
        destination: '/en',
        permanent: false,
      },
      {
        source: '/:locale(es|nl)/:path*',
        destination: '/en/:path*',
        permanent: false,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
