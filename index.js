const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");

require("dotenv").config();

const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');

mongoose.connect(process.env.dbURL)
  .then(console.log("Database Connected."))
  .catch(error => console.log(error));

app.use(express.json());

app.use(express.static(__dirname + "/publuc"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-Width,Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    next();
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));