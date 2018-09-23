const express = require('express');
const db = require('../database/database');
const port = 5000;
const app = express();

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/users/:userId', (req, res) => {
  db.readUserData(req.params.userId, (error, results) => {
    if (error) {
      res.status(500).send('Error in retrieving user data');
    } else {
      res.status(200).send(results);
    }
  });
});

app.post('/users', (req, res) => {
  db.writeUserData(req.body.userId, req.body.username, req.body.email, (error, results) => {
    if (error) {
      res.status(500).send('Error in creating user');
    } else {
      res.status(201).send('User created');
    }
  });
});

app.delete('/users/:userId', (req, res) => {
  db.deleteUserData(req.params.userId, (error, results) => {
    if (error) {
      res.status(500).send('Error in deleting user');
    } else {
      res.status(202).send('User deleted');
    }
  });
});
