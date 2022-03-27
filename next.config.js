/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    API_KEY: process.env.API_KEY,
    MONGO_URI: `mongodb+srv://next-news-user:3JevWBAP65EB01p2@cluster0.njou8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  }
}

module.exports = nextConfig
