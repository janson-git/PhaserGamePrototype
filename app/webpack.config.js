/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: './src/App.ts',
        vendors: ['phaser'],
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

    /** Ну не знаю, какое-то оно кривое. Проще поставить http-server
     * и запустить его из директории dist. После этого и работает всё норм.
     */
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        open: true,
        port: 8080,
        host: '0.0.0.0'
    },

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