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
const authDomain = "YOUR AUTH DOMAIN";
const databaseURL = "YOUR DATABASE URL";

module.exports = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: databaseURL
};
```

Build files and start the server:

```
cd react-firebase-boilerplate
npm run start
```



