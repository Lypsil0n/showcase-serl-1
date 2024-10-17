const nextBasePath = process.env.NEXT_BASE_PATH || ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: nextBasePath,
}

export const images = {
  domains: ['raw.githubusercontent.com'],
}

export default nextConfig
