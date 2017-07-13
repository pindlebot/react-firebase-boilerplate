const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var dev = process.env.NODE_ENV === 'development' ? true : false;
var plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
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
  // the filename template for entry chunks
  chunkFilename: '[name].[chunkhash].chunk.js',
  // the filename template for additional chunks
  path: path.resolve(__dirname, "dist"), // string
  // the target directory for all output files
  // must be an absolute path (use the Node.js path module)
  publicPath: "/", 
  // the url to the output directory resolved relative to the HTML page
  sourceMapFilename: '[file].map',
  // pathinfo: true, // boolean
  // include useful path info about modules, exports, requests, etc. into the generated code
}

var devOutput = {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/'
}

var prodEntry = './src/App.js'
var devEntry =  [
  'react-hot-loader/patch',
  // activate HMR for React
  'webpack-dev-server/client?http://localhost:3000',
  // bundle the client for webpack-dev-server
  // and connect to the provided endpoint
  'webpack/hot/only-dev-server',
  // bundle the client for hot reloading
  // only- means to only hot reload for successful updates
  './src/App.js',
  // the entry point of our app
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
    maxAssetSize: 200000, // int (in bytes),
    maxEntrypointSize: 400000, // int (in bytes)
    assetFilter: function(assetFilename) {
      // Function predicate that provides asset filenames
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },

  devtool: "source-map", // enum
  context: __dirname, // string (absolute path!)
  target: "web", // enum
  // externals: ["react"],
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    // hash: true,
  },

  devServer: {
    // proxy: { // proxy URLs to backend development server
    //  '/api': 'http://localhost:3000'
    // },
    contentBase: path.join(__dirname, 'dist'), 
    // boolean | string | array, static file location
    // compress: true, 
    // enable gzip compression
    historyApiFallback: true, 
    // true for index.html upon 404, object for multiple paths
    hot: true, 
    // hot module replacement. Depends on HotModuleReplacementPlugin
    // https: false, 
    // true for self-signed, object for cert authority
    // noInfo: true,
    // only errors & warns on hot reload
    publicPath: '/',
    port: 3000
  },

  plugins: dev ? devPlugins : prodPlugins,
  profile: true,
  // capture timing information
  // cache: false, // boolean
  // disable/enable caching
  // watch: true, // boolean
  // enables watching

}