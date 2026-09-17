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
  // The site dropped its /en prefix and its Spanish and Dutch versions.
  // Everything that was live under those paths lands on its new home.
  async redirects() {
    return [
      { source: '/:locale(en|es|nl)', destination: '/', permanent: false },
      { source: '/:locale(en|es|nl)/:path*', destination: '/:path*', permanent: false },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
