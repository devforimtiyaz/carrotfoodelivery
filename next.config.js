/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    modularizeImports: {
        '@mui/material': {
            transform: '@mui/material/{{member}}',
        },
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
        'lodash': {
            transform: 'lodash/{{member}}',
        },
    },
    images: {
        domains: ['stackfood.6am.one', 'carrotfoodelivery.com'],
    },
}
