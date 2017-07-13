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


[npm-image]: https://badge.fury.io/js/react-firebase-boilerplate.svg
[npm-url]: https://npmjs.org/package/react-firebase-boilerplate
[travis-image]: https://travis-ci.org/focuswish/react-firebase-boilerplate.svg?branch=master
[travis-url]: https://travis-ci.org/focuswish/react-firebase-boilerplate
[daviddm-image]: https://david-dm.org/focuswish/react-firebase-boilerplate.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/focuswish/react-firebase-boilerplate
[coveralls-image]: https://coveralls.io/repos/focuswish/react-firebase-boilerplate/badge.svg
[coveralls-url]: https://coveralls.io/r/focuswish/react-firebase-boilerplate


