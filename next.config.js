/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    MONGO_URI: process.env.MONGO_URI,
    CLOUDINARY_API: process.env.CLOUDINARY_API,
  }
}

module.exports = nextConfig
