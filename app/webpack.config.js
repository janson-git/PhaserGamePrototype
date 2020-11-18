/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

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