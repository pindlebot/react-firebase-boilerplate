const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/client.js"],
  devtool: "eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "[name].bundle.js",
    publicPath: "/",
    sourceMapFilename: "[name].map"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader?limit=8192"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["polyfills", "vendor"].reverse()
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      chunksSortMode: "dependency"
    })
  ]
};
