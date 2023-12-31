/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
    ...withPWA({
      pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
      },
      images: {
        domains: [
          "oaidalleapiprodscus.blob.core.windows.net",
        ],
      },
    }),
  };

module.exports = withPWA(nextConfig)
