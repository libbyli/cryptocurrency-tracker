const firebase = require('firebase');
// The configuration for initializing the application will be provided!

firebase.initializeApp({
  databaseURL: 'https://leapyear-take-home-38581.firebaseio.com/',
});

// firebase.database.enableLogging(true, true);

const db = firebase.database();

module.exports = db;
