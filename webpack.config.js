const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

/**
 * HTML Webpack Plugin
 * @desc Configuration for building the HTML page
 * @note Some props are injected and some are configuration (rendering) settings
 */
const htmlPlugin = new HtmlWebPackPlugin({
    title: "Invoice App",
    template: "./src/index.html",
    filename: "./index.html"
});

const hotModulePlugin = new webpack.HotModuleReplacementPlugin();
const miniCssPlugin = new MiniCssExtractPlugin({filename: "[name].css", chunkFilename: "[id].css"});

/**
 * Webpack Configuration
 */
module.exports = {
    entry: ['webpack/hot/dev-server', './src/index.jsx'],
    target: 'electron-renderer',
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: './',
        filename: 'bundle.js'
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                    /.json?/
                ],
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["env", "react"]
                    }
                }
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', '@babel/preset-react'
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-proposal-class-properties", {
                                "loose": true
                            }
                            ]
                        ]
                    }
                }
            },

            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }, {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'src/scss')
                ],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        htmlPlugin,
        hotModulePlugin,
        miniCssPlugin,
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru', 'pl'],
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    devServer: {
        publicPath: 'http://localhost:9000',
        contentBase: path.join(__dirname, 'assets'),
        open: false,
        lazy: false,
        compress: true,
        historyApiFallback: true,
        port: 9000,
        proxy: {
            '/assets/*': {
                target: 'http://localhost:9000/',
                pathRewrite: {'^/assets': ''},
            }
        }
    }
}