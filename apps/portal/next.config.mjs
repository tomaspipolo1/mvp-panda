/** @type {import('next').NextConfig} */
const basePath = "/portal"

const nextConfig = {
  basePath,
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
