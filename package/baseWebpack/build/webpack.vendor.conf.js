const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        vendor: [
            'vue/dist/vue.esm.js',
            'vuex/dist/vuex.esm.js',
            'vue-router/dist/vue-router.esm.js',
            'axios',
            'element-ui',
            'jquery',
            'lodash',
            'mint-ui',
            'moment',
            'v-distpicker',
            'jsbarcode',
            'crypto-js',
            'dayjs',
            'vuedraggable',
            'vue-scroller',
            'vue2-toast',
            'vue-infinite-loading',
            'vue-infinite-scroll',
            'qrcode',
        ]
    },
    output: {
        path: path.resolve('./static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve('.', '[name]-manifest.json'),
            name: '[name]_library'
        })
    ]
}