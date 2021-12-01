/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["eth-poll.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
