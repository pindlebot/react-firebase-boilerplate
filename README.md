# react-firebase-boilerplate
[![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

A React + Firebase starter project with hot-reloading. 

## Features

- Hot-reloading
- Reactfire

## Quickstart

Clone the repository and install dependencies:

```
git clone https://github.com/focuswish/react-firebase-boilerplate
cd react-firebase-boilerplate
npm install
```

Add your Firebase config in ./src/config.js:

```js
const config = {
  apiKey: 'your-api-key',
  authDomain: 'your-app.firebaseapp.com',
  databaseURL: 'https://your-app.firebaseio.com',
  projectId: 'your-app',
  storageBucket: 'your-app.appspot.com',
  messagingSenderId: 'your-messaging-id',
};
```

Start the server:

```bash
npm run dev
```

## Production

```bash
npm run prod
```

## Caveats

During development, make sure that read and write are set to true in firebase database rules.

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```




