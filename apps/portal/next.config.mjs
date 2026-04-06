/** @type {import('next').NextConfig} */
const nextConfig = {
  // No usar `basePath`: Vercel no lo permite junto a `builds` en vercel.json.
  // Las URLs públicas son `/portal/*` vía rewrites + prefijo en enlaces (`toPortalPath`).
  assetPrefix: "/portal",
  async rewrites() {
    return [
      { source: "/portal", destination: "/" },
      { source: "/portal/:path*", destination: "/:path*" },
    ]
  },
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
