/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@jess-web/ui", "@jess-web/env"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: `${process.env.INTERNAL_API_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
