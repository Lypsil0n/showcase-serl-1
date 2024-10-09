const nextBasePath = process.env.NEXT_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: nextBasePath,
}

export default nextConfig
