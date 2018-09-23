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
  db.writeUserData(req.body.userId, req.body.username, req.body.email, (error) => {
    if (error) {
      res.status(500).send('Error in creating user');
    } else {
      res.status(201).send('User created');
    }
  });
});

app.put('/users/:userId/currency', (req, res) => {
  db.addUserCurrency(req.params.userId, req.body.currency, (error) => {
    if (error) {
      res.status(500).send('Error in adding currency');
    } else {
      res.status(200).send('Currency successfully added');
    }
  });
});

app.delete('/users/:userId/currency/:currency', (req, res) => {
  db.deleteUserCurrency(req.params.userId, req.params.currency, (error) => {
    if (error) {
      res.status(500).send('Error in removing currency');
    } else {
      res.status(200).send('Currency removed');
    }
  });
});

app.delete('/users/:userId', (req, res) => {
  db.deleteUserData(req.params.userId, (error) => {
    if (error) {
      res.status(500).send('Error in deleting user');
    } else {
      res.status(200).send('User deleted');
    }
  });
});
