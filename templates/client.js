import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import reactfire from 'reactfire';
import keys from './keys';
require('style!css!./style.css');

firebase.initializeApp(keys);

class App extends React.Component { 
  render() {
    return (
      <H1>Happy coding!</H1>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById("root"));