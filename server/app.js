const app = require('express')();
const firebase = require('../database/firebase');
const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
