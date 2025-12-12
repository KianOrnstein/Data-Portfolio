/**
 * Utility functions for handling asset paths correctly in both
 * GitHub Pages subdirectory and custom domain scenarios
 */

/**
 * Get the base path for static assets
 * - For custom domain: returns empty string (root domain)
 * - For GitHub Pages subdirectory: returns the subdirectory path
 * 
 * Note: In static export, NEXT_PUBLIC_BASE_PATH is set at build time.
 * For custom domain, ensure BASE_PATH is not set or is empty string when building.
 */
export function getBasePath(): string {
  // In both server-side and client-side, use the environment variable
  // This is set at build time for static exports
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // In client-side, we can optionally override if on custom domain
  // But this should be handled at build time, so we just return the env value
  if (typeof window !== 'undefined') {
    // If basePath is set but we're on a custom domain, we might want to ignore it
    // However, for static export, this should be handled at build time
    // So we just return what was set during build
    return basePath
  }
  
  // Server-side (build time)
  return basePath
}

/**
 * Get the correct path for a static asset
 * Automatically handles basePath for both scenarios
 */
export function getAssetPath(path: string): string {
  const basePath = getBasePath()
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // If basePath is empty (custom domain), just return /path
  if (!basePath) {
    return `/${cleanPath}`
  }
  
  // Otherwise, prepend basePath
  return `${basePath}/${cleanPath}`
}

/**
 * Get the correct path for an API route or fetch request
 */
export function getFetchPath(path: string): string {
  return getAssetPath(path)
}

