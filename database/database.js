const db = require('./firebase');

function writeUserData(userId, username, email) {
  db.ref(`users/${userId}`).set({
    username,
    email,
    currency: [],
  })
    .then(() => console.log('User data successfully written'))
    .catch(error => console.log('Error in writing user data: ', error));
}

function deleteUserData(userId) {
  db.ref(`users/${userId}`).remove()
    .then(() => console.log('User data successfully removed'))
    .catch(error => console.log('Error in removing user data: ', error));
}

writeUserData(1, 'libby', 'sincerelylibby@gmail.com');