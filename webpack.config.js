const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var dev = process.env.NODE_ENV === 'development' ? true : false;
var plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/app/index.html'
  }),
]

var prodPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    children: true,
    minChunks: 2,
    async: true,
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
].concat(plugins)

var devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
].concat(plugins)

var prodOutput = {
  filename: '[name].[chunkhash].js',
  chunkFilename: '[name].[chunkhash].chunk.js',
  path: path.resolve(__dirname, "dist"), // string
  publicPath: "/", 
  sourceMapFilename: '[file].map',
}

var devOutput = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/'
}

var prodEntry = './src/app/entry.js'
var devEntry =  [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:3000',
  'webpack/hot/only-dev-server',
  './src/app/entry.js',
] 

module.exports = {
  entry: dev ? devEntry : prodEntry,
  output: dev ? devOutput : prodOutput,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }, {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src"),
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
  },

  performance: {
    hints: process.env.NODE_ENV === 'prod' ? "warning" : false,
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },

  devtool: "source-map", 
  context: __dirname, 
  target: "web", 
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'), 
    historyApiFallback: true, 
    hot: true, 
    publicPath: '/',
    port: 3000
  },

  plugins: dev ? devPlugins : prodPlugins,
  profile: true,
}