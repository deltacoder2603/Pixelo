import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**', // You can restrict further if needed, e.g., '/v/*'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**', // Adjust pathname if needed
      },
      {
        protocol: 'https',
        hostname: 'yt3.googleusercontent.com',
        port: '',
        pathname: '/**', // Allowing images from yt3.googleusercontent.com
      },
      {
        protocol: 'https',
        hostname: 'i9.ytimg.com', // Add this line to allow images from i9.ytimg.com
        port: '',
        pathname: '/**', // You can further restrict if necessary
      },
    ],
  },
};

export default nextConfig;
