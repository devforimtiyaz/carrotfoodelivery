/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    productionBrowserSourceMaps: true,
    images: {
        domains: ['stackfood.6am.one', 'carrotfoodelivery.com'],
    },
}
