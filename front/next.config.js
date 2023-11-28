/** @type {import('next').NextConfig} */
const path = require("path")
const nextConfig = {
  images: {
    domains: ['localhost']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
