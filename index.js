const express = require('express');
const opn = require('opn')
const app = express();

const webpack = require('webpack')
const dev = process.env.NODE_ENV === 'development' ? true : false
const port = process.env.PORT || 3000

//var webpackDevMiddleware = require("webpack-dev-middleware");
//var webpackConfig = require("./webpack.config");
//var config = webpackDevMiddleware(webpack(webpackConfig), {
//  lazy: true,
//  filename: "bundle.js"
//})

app.use('/', express.static('dist'))

app.listen(port, () => {
  console.log("Environment: " + process.env.NODE_ENV)
  console.log("Listening on port " + port)
  console.log("Opening http://localhost:" + port)
  
  opn('http://localhost:' + port)
});