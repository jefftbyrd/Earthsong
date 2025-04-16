/** @type {import('next').NextConfig} */
import NextPWA from 'next-pwa';

const withPWA = NextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {};

export default withPWA(nextConfig);
