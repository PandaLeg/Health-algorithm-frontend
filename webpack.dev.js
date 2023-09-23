const path = require("path");
const {merge} = require("webpack-merge");
const common = require('./wepback.common')

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].js',
        publicPath: '/',
        clean: true
    },
    devServer: {
        port: '9090',
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
})
