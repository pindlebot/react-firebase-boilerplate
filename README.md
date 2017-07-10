# react-firebase-boilerplate

A ReactJs Firebase starter project that leverages Express and ReactFire. 

## Uses

- Webpack
- Express 
- React 
- Firebase
- ReactFire

## Quickstart

Clone the repository:

```
git clone https://github.com/focuswish/react-firebase-boilerplate
```

Add your Firebase API keys:

```
cd react-firebase-boilerplate/src
touch keys.js
```
Then add the following to <code>keys.js</code>:

```javascript
const apiKey = "YOUR API KEY";
const authDomain = "YOUR AUTH DOMAIN"; // e.g., moaningmyrtle-2d294.firebaseapp.com
const databaseURL = "YOUR DATABASE URL"; // e.g., https://moaningmyrtle-2d294.firebaseio.com
const databaseRef = 'WHERE YOU WANT TO STORE THE DATA'; //e.g., moaningmyrtle/items, where "moaningmyrtle" was the name of my app

module.exports = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL
  databaseRef: databaseRef
};
```

Install npm packages:
```
cd react-firebase-boilerplate
npm install
```

Build files and start the server:

```
npm run start
```

### Remove the example project

```
npm run clean
```




