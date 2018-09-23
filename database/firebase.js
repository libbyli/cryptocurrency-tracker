const firebase = require('firebase');
// The configuration for initializing the application will be provided!

firebase.initializeApp({
  databaseURL: 'https://leapyear-take-home-38581.firebaseio.com/',
});

const db = firebase.database();

module.exports = db;
