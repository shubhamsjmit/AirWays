const path = require('path');

module.exports = {
    API: {
        URL: process.env.VUE_APP_ECOMMERCE_FLIGHT_URL
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve('src'),
        }
    },
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            title: 'Fly Ways',
        },
    },
}