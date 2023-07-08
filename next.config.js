/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    USER_IDKEY: 's9DskdRluvgQqysCJAbaDLnpqm93',
  },
  images: {
    domains: ['cdn-products.eneba.com', 'gamersgatep.imgix.net', 'cdn.akamai.steamstatic.com', "images.2game.com"],
  },
}

module.exports = nextConfig
