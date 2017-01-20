import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import reactfire from 'reactfire';
import keys from './keys';
require('style!css!./style.css');

firebase.initializeApp(keys);

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
    this.firebaseRef = firebase.database().ref(databaseRef);
    this.firebaseRef.limitToLast(5).on('value', function(dataSnapshot) {
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

  noteUpdate(event) {
    this.setState({text: event.target.value});
  }

  titleUpdate(event) {
    this.setState({title: event.target.value});
  }

  saveNote(event) {
    event.preventDefault();
    this.firebaseRef.push({text: this.state.text, title: this.state.title});
    this.setState({toggle: false, text: '', title: ''});
  }

  newNote() {
    this.setState({toggle: true});
  }

  render() {
    const styles = {
      width: "100%",
      height: "16em",
    };
    var addNote = '';

    const items = this.state.items;
    const records = items.map((items) => 
      <div>
        <h4>{items.title}</h4>
        <div key={items.key}>{items.text}</div>
      </div>
    );

    if (this.state.toggle) {
      var addNote = (
        <div>
          <div className="flex-row"><input placeholder="Note title" value={this.state.title} onChange={this.titleUpdate.bind(this)} /></div>
          <div className="flex-row"><textarea placeholder="Note content" value={this.state.text} onChange={this.noteUpdate.bind(this)} style={styles}/></div>
          <button onClick={this.saveNote.bind(this)}>Save</button>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="notes-wrapper">{records}</div>
        <hr />
        <div className="notes-wrapper">{addNote}</div>
        <hr />
        <button onClick={this.newNote.bind(this)}>New Note</button>
      </div>
    );
  }

}

ReactDOM.render(
  <App/>, document.getElementById("root"));