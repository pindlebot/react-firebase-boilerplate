import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import reactfire from 'reactfire';
import uuid from 'uuid/v4';
import config from './config';
import Notes from './components/Notes';
import './style.css';

firebase.initializeApp(config);

const pushToFirebase = ({ text, title }) => {
  const key = uuid();
  const updates = {};
  updates[`items/${key}`] = { text, title, key };
  return firebase.database().ref().update(updates);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      toggle: false,
      title: '',
      text: '',
    };
  }

  componentWillMount() {
    this.ref = firebase.database().ref('items');
    this.ref.on('value', (snapshot) => {
      const items = [];
      snapshot.forEach((child) => {
        const item = child.val();
        item.key = child.key;
        items.push(item);
      });
      this.setState({ items });
    });
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  saveNote(event) {
    event.preventDefault();
    const { title, text } = this.state;
    pushToFirebase({ title, text });
    this.setState({ toggle: false, text: '', title: '' });
  }

  render() {
    const styles = {
      width: '100%',
      height: '16em',
    };
    const { items, toggle } = this.state;
    return (
      <div>
        <div className="header" />
        <div className="app-content">
          <h1>Firebase + React</h1>
          <Notes items={items} />
          <div className="form-elem">
            {toggle ? <div>
              <div className="row">
                <input
                  placeholder="Note title"
                  value={this.state.title}
                  onChange={(e) => { this.setState({ title: e.target.value }); }}
                />
              </div>
              <div className="row">
                <textarea
                  placeholder="Note content"
                  value={this.state.text}
                  onChange={e => this.setState({ text: e.target.value })}
                  style={styles}
                />
              </div>
              <div className="row">
                <button
                  className="common-btn"
                  onClick={this.saveNote.bind(this)}
                >
                Save
                </button>
                <button
                  className="common-btn hero-btn"
                  onClick={() => { this.setState({ toggle: true }); }}
                >New Note
               </button>
              </div>
            </div> :
            <div className="row"><button
              className="common-btn hero-btn"
              onClick={() => { this.setState({ toggle: true }); }}
            >New Note
               </button></div>}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root'));
