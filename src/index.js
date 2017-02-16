import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import App from './App';
import './index.css';

firebase.initializeApp({
  apiKey: "AIzaSyAFNAUEPPFMY5gdbfjEmeWnFdm15bGSBUk",
  authDomain: "pseudogram-9115e.firebaseapp.com",
  databaseURL: "https://pseudogram-9115e.firebaseio.com",
  storageBucket: "pseudogram-9115e.appspot.com",
  messagingSenderId: "780878935837"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
