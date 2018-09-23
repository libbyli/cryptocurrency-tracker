const app = require('express')();
const db = require('../database/database');
const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/:userId', (req, res) => {
  db.readUserData(req.params.userId, (error, results) => {
    if (error) {
      res.status(500).send('Error in retrieving user data');
    } else {
      res.status(200).send(results);
    }
  });
});
