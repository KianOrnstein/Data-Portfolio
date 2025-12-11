/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  // Output static HTML for GitHub Pages
  output: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  // Base path for GitHub Pages (if using custom domain, set this to empty string)
  basePath: process.env.GITHUB_PAGES === 'true' && process.env.BASE_PATH ? process.env.BASE_PATH : '',
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: process.env.GITHUB_PAGES === 'true',
  // Disable source maps completely for faster compilation
  experimental: {
    serverSourceMaps: false,
    optimizePackageImports: ['remark', 'remark-html', 'gray-matter'],
  },
  // Optimize compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Suppress source map warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Optimize TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Image optimization for static export
  images: {
    unoptimized: process.env.GITHUB_PAGES === 'true',
  },
}

module.exports = nextConfig

