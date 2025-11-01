/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: '.',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
