/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      formats: ['image/avif', 'image/webp'],
      domains: ['kind-approval-da99393621.media.strapiapp.com', 'localhost:1337'],
    },
    swcMinify: true,
  
  };
  
  module.exports = nextConfig;
  