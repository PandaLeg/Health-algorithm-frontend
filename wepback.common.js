const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@fonts': path.resolve(__dirname, 'src', 'assets', 'fonts')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif|webp)/,
                type: 'asset/resource',
                parser: {
                    // Conditions for converting to base64
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 25kb
                    }
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)/,
                type: 'asset/resource'
            },
            {
                test: /\.vue/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.DefinePlugin({
            'process.env': {},
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_OPTIONS_API__: true
        }),
        // new BundleAnalyzerPlugin(),
        new webpack.NormalModuleReplacementPlugin(
            /moment-timezone\/data\/packed\/latest\.json/,
            require.resolve('./misc/timezone-definitions')
        )
    ]
}
