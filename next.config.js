/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  // Output static HTML for GitHub Pages
  output: process.env.NODE_ENV === 'production' && process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  // Base path for GitHub Pages
  // - For custom domain: leave empty (or set BASE_PATH='')
  // - For GitHub Pages subdirectory: set BASE_PATH='/repo-name'
  // When using custom domain, assets should load from root, so basePath must be empty
  basePath: process.env.GITHUB_PAGES === 'true' && process.env.BASE_PATH ? process.env.BASE_PATH : '',
  // Asset prefix for CDN or custom domain scenarios
  // For custom domain, leave empty to serve from same domain
  assetPrefix: process.env.GITHUB_PAGES === 'true' && process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '',
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
  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || '',
  },
}

module.exports = nextConfig

