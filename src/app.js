const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./server/routes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/driving', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('open', err => {
    if(err) console.log('Database error:', err);
    else console.log('Success starting database!');
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
    secret: 'abcsidis123',
    saveUninitialized: true,
    resave: true,
    cookie: {httpOnly: true}
}));

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if(err) console.log('Server error:', err);
    else console.log('Success running server on port', port);
});

routes(app);
