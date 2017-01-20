const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/client.js',
    output: {
        path: './public',
        filename: '[name].bundle.js',
        publicPath: '/public',
        sourceMapFilename: '[name].map'
    },
    resolve: {
        extensions: [
            '', '.ts', '.js', '.json'
        ],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel']
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new webpack
            .optimize
            .CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
        new HtmlWebpackPlugin({template: 'src/index.html', chunksSortMode: 'dependency'})
    ]
};
