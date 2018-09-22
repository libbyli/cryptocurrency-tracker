const firebase = require('firebase');
// The configuration for initializing the application will be provided!

firebase.initializeApp({
  databaseURL: 'DATABASE URL',
});

const db = firebase.database();

module.exports = db;
