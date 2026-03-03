import type { NextConfig } from "next";
// @ts-ignore
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const isAnalyze = process.env.ANALYZE === 'true';

const baseConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  // Silence Next 16 notice when a webpack config plugin is present by providing
  // an empty Turbopack configuration as per official docs.
  turbopack: {},
};

const finalConfig = isAnalyze ? withBundleAnalyzer(baseConfig) : baseConfig;
export default finalConfig;
