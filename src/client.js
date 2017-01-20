import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import reactfire from 'reactfire';
import { config } from './config';

firebase.initializeApp(config);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      items: []
    }
  }

  
  componentWillMount() {
    this.firebaseRef = firebase.database().ref('moaningmyrtle/items');
    this.firebaseRef.limitToLast(25).on('value', function(dataSnapshot) {
      var items = [];
      dataSnapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item['.key'] = childSnapshot.key;
        items.push(item);
      }.bind(this));
      this.setState({
        items: items
      });
    }.bind(this));
  };
    
  componentWillUnmount() {
    this.firebaseRef.off();
  };

  handleChange(event) {
    this.setState({text: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.firebaseRef.push({text: this.state.text});
    this.setState({text: ''});
  }

  render() {
    const items = this.state.items;
    const list = items.map((items) => 
      <p key={items.key}>{items.text}</p>
    );
    return (
      <div>
      {list}
        <input value={this.state.text} onChange={this.handleChange.bind(this)} />
        <button onClick={this.onSubmit.bind(this)}>Submit</button>
      </div>
    );
  }

}

ReactDOM.render(
  <App/>, document.getElementById("root"));