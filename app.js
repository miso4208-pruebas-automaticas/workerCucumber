'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

var cucumberController = require('./app/controllers/cucumber.ctrl.js');

const port = 8005;

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/test', [cucumberController]);

app.use( function (req, res, next) {
    next();
});

app.listen(port, () => {
  console.log('Worker cucumber listening on ' + port);
});
