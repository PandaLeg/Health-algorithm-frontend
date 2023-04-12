const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => process.env.NODE_ENV === 'development' ? `[name].${ext}` : `[name].[fullhash].${ext}`

const optimization = () => {
    console.log(path.join(__dirname))
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            '...',
            new CssMinimizerPlugin()
        ]
    }

    return config
}

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js')
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: filename('js'),
        publicPath: (isDev ? '' : './')
    },
    devServer: {
        port: '9090',
        hot: isDev,
        historyApiFallback: true
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
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|svg|gif)/,
                type: 'asset/resource'
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
            template: path.resolve(__dirname, 'src', 'index.html')
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
        })
    ]
}
