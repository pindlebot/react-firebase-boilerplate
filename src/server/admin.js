var admin = require('firebase-admin')
var serviceAccount = require('../../service_account.json')

module.exports = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://arsenic-374f3.firebaseio.com'
}, 'server')
