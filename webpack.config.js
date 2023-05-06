const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const {GenerateSW} = require('workbox-webpack-plugin');
const Critters = require('critters-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        },
    }

    if (isProd) {
        config.minimize = true
        config.minimizer = [
            new TerserPlugin({
                parallel: 4,
            }),
            new CssMinimizerPlugin()
        ]
        config.moduleIds = 'deterministic'
        config.runtimeChunk = 'single'
        Object.assign(config.splitChunks, {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            },
        })
    }

    return config
}

const prodPlugins = () => {
    const arr = []

    if (isProd) {
        arr.push(new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            exclude: [/\.(?:png|jpg|jpeg|webp|svg)$/], // from precaching
            runtimeCaching: [
                { // runtime cache for images
                    urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/,
                    handler: 'CacheFirst',
                    options: {
                        expiration: {maxEntries: 50},
                        cacheName: 'images',
                    },
                },
            ],
        }))
        arr.push(new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.js(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
        }))
        arr.push(new Critters({
            path: path.resolve(__dirname, 'dist'),
            publicPath: './',
            preload: 'swap'
        }))
    }

    return arr
}

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: filename('js'),
        publicPath: isDev ? '/' : './',
        clean: true
    },
    devServer: {
        port: '9090',
        hot: isDev,
        historyApiFallback: true,
    },
    devtool: isDev ? 'source-map' : undefined,
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@fonts': path.resolve(__dirname, 'src', 'assets', 'fonts')
        }
    },
    optimization: optimization(),
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "sass-loader"
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
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {},
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_OPTIONS_API__: true
        }),
        // new BundleAnalyzerPlugin(),
        ...prodPlugins()
    ]
}
