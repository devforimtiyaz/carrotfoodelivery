/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    transpilePackages: [
        'date-fns',
        'lodash',
        '@mui/x-date-pickers',
        '@mui/x-date-pickers-pro',
    ],
    images: {
        domains: ['stackfood.6am.one', 'carrotfoodelivery.com'],
    },
}
