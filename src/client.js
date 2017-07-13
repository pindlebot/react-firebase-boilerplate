import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import reactfire from 'reactfire';
import config from './config';
import uuid from 'uuid/v4'

require('style-loader!css-loader!./style.css');

firebase.initializeApp(config);

//const getItems = async () => {
//  var snap = await firebase.database().ref('items').on('value')
//  var val = await snap.val()
//  return val ? Object.keys(val).map(key => val[key]) : null
//}

const pushToFirebase = ({text, title}) => {
  var key = uuid()
  var updates = {}
  updates[`items/${key}`] = {text, title, key}
  return firebase.database().ref().update(updates)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toggle: false,
      title: '',
      text: ''
    }
  }

  componentWillMount() {
    this.ref = firebase.database().ref('items');
    this.ref.on('value', (snapshot) => {
      var items = [];
      snapshot.forEach(child => {
        var item = child.val();
        item['key'] = child.key;
        items.push(item);
      })
      this.setState({items})
    })
  };
    
  componentWillUnmount() {
    this.firebaseRef.off();
  };
  
  saveNote(event) {
    event.preventDefault();
    var {title, text} = this.state
    pushToFirebase({title, text})
    this.setState({toggle: false, text: '', title: ''});
  }

  render() {
    const styles = {
      width: "100%",
      height: "16em",
    };
    var {items, toggle} = this.state;
    return (
      <div className="container">
        <div className="notes-wrapper">
          {items && items.length > 0 ? items.map((items) => 
            <div>
              <h4 key={items.key}>{items.title}</h4>
              <div>{items.text}</div>
            </div>
          ) : ''}
        </div>
        <hr />
        <div className="notes-wrapper">
          {toggle ? <div>
            <div className="flex-row">
              <input 
                placeholder="Note title" 
                value={this.state.title} 
                onChange={(e) => { this.setState({title: e.target.value}) }} 
              />
            </div>
            <div className="flex-row">
              <textarea 
                placeholder="Note content" 
                value={this.state.text} 
                onChange={(e) => this.setState({text: e.target.value}) } 
                style={styles}
              />
            </div>
            <button onClick={this.saveNote.bind(this)}>Save</button>
          </div> : ''}
        </div>
        <hr />
        <button onClick={() => { this.setState({toggle: true}) }}>New Note</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById("root"));
