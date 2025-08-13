// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  i18n: {
    locales: ['it', 'en', 'es'],
    defaultLocale: 'it',
  },
  reactStrictMode: true,
};

export default nextConfig;