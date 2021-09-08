import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

var firebaseConfig = {
  apiKey: "AIzaSyCZlQSM_HAPn-uFjjEed0IRa1IopQipw28",
  authDomain: "todo-list-38cdc.firebaseapp.com",
  databaseURL: "https://todo-list-38cdc-default-rtdb.firebaseio.com",
  projectId: "todo-list-38cdc",
  storageBucket: "todo-list-38cdc.appspot.com",
  messagingSenderId: "705142529190",
  appId: "1:705142529190:web:67f04e0bcc17a39445a867"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDB = firebaseApp.database()

export { firebaseAuth, firebaseDB }