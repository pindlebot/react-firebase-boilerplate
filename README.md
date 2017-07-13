# react-firebase-boilerplate

A ReactJs Firebase starter project that leverages Express and ReactFire. 

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

Add your Firebase config in ./src/config.js.

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




