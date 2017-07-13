import uuid from 'uuid/v4';
import firebase from 'firebase';
const {auth, ref} = require('./config')

const pushToFirebase = ({ text, title }) => {
  const key = uuid();
  const updates = {};
  updates[`items/${key}`] = { text, title, key };
  return ref.update(updates);
};

const login = (email, pw) => {
  return auth().signInWithEmailAndPassword(email, pw)
}

const resetPassword = (email) => {
  return auth().sendPasswordResetEmail(email)
}

const createUser = (email, pw) => {
  return auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

const saveUser = (user) => {
  return ref.child(`users/${user.uid}`)
    .set({
      email: user.email,
      uid: user.uid,      
    }).then(() => user)
}

module.exports = { 
  pushToFirebase,
  login,
  resetPassword,
  createUser,
  saveUser
}