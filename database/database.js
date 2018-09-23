const db = require('./firebase');

function writeUserData(userId, username, email, callback) {
  db.ref(`users/${userId}`).set({
    username,
    email,
  })
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
}

function deleteUserData(userId, callback) {
  db.ref(`users/${userId}`).remove()
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
}

function readUserData(userId, callback) {
  db.ref(`users/${userId}`).once('value')
    .then(results => callback(null, results.val()))
    .catch(error => callback(error, null));
}

function updateUserCurrency(userId, newCurrency, callback) {
  db.ref(`users/${userId}/currency`).push().set(newCurrency)
    .then(results => callback(null, results))
    .catch(error => callback(error, null));
}

module.exports = {
  writeUserData,
  deleteUserData,
  readUserData,
  updateUserCurrency,
};
