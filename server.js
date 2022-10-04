const express = require('express');
const mongoose = require ('mongoose');
const routes = require ('./routes')
const db = require('./config/config');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

mongoose.set('debug', true);


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}!`);
    });
  });