/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

const e = new Date();
const Y = e.getFullYear();
let M = (e.getMonth() + 1).toString().padStart(2, '0');
let D = e.getDate().toString().padStart(2, '0');
let h = e.getHours().toString().padStart(2, '0');
let m = e.getMinutes().toString().padStart(2, '0');
let s = e.getSeconds().toString().padStart(2, '0');

const versionString = '' + Y + M + D + 'T' + h + m + s;

module.exports = {
    entry: {
        app: './src/App.ts',
        vendors: ['phaser'],
    },

    watchOptions: {
        ignored: /node_modules/
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/, path.resolve(__dirname, 'lib')],
            },
        ],
    },

    // devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    mode: 'development',

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'index.html',
                },
                {
                    from: 'assets/**/*',
                },
            ],
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            VERSION: JSON.stringify(versionString)
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};