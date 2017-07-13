const express = require('express');
const opn = require('opn')
const app = express();
const dev = process.env.NODE_ENV === 'development' ? true : false
const port = process.env.PORT || 3000

app.use('/', express.static('dist'))

app.listen(port, () => {
  console.log("Environment: " + process.env.NODE_ENV)
  console.log("Listening on port " + port)
  console.log("Opening http://localhost:" + port)
  
  opn('http://localhost:' + port)
});