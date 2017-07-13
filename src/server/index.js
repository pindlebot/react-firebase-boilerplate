const express = require('express');
const opn = require('opn')
const app = express();
const dev = process.env.NODE_ENV === 'development' ? true : false
const port = process.env.PORT || 3000
const { graphql } = require('graphql');
const schema = require('./schema');
const path = require('path')

app.use('/', express.static(path.join(__dirname, '../../dist')))

app.get('/graphql', (req, res) => {
  var query = '{ hello }';
  graphql(schema, query).then(result => {
    res.json(result)
  });
});

app.listen(port, () => {
  console.log("Environment: " + process.env.NODE_ENV)
  console.log("Listening on port " + port)
  console.log("Opening http://localhost:" + port)
  
  opn('http://localhost:' + port)
});