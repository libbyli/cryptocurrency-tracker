const db = require('./firebase');

function writeUserData(userId, username, email) {
  db.ref(`users/${userId}`).set({
    username,
    email,
    currency: [],
  });
}

function deleteUserData(userId) {
  db.ref(`users/${userId}`).remove();
}