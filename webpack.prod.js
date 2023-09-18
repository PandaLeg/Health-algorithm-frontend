const path = require("path");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {GenerateSW} = require("workbox-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {merge, mergeWithCustomize, unique} = require("webpack-merge");
const common = require('./wepback.common')

const plugins = {
    plugins: [
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            exclude: [/\.(?:png|jpg|jpeg|webp|svg|json)$/], // from precaching
            runtimeCaching: [
                { // runtime cache for images
                    urlPattern: /\.(?:png|jpg|jpeg|svg|webp|json)$/,
                    handler: 'StaleWhileRevalidate',
                    options: {
                        expiration: {maxEntries: 50},
                        cacheName: 'images',
                    },
                },
            ],
        }),
        new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
        }),
    ]
}

const mergePlugins = mergeWithCustomize({
    customizeArray: unique(
        'plugins',
        ['GenerateSW', 'CompressionPlugin'],
        (plugin) => plugin.constructor && plugin.constructor.name)
})(common.plugins, plugins)

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/',
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            },
        }
    },
    plugins: mergePlugins.plugins
})
