/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@jess-web/ui", "@jess-web/env"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
