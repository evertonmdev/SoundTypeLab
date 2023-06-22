/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.ytimg.com']
    },
    experimental: {
        serverActions: true,
    }
}

module.exports = nextConfig
