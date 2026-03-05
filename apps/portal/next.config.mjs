/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/portal",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
