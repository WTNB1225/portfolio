/** @type {import('next').NextConfig} */
const path = require("path")
const nextConfig = {
  images: {
    domains: ['wtnbjp-portfolio.onrender.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
