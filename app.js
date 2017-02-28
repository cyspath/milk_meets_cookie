const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging framework
const routes = require('./routes');
const sassMiddleware = require('node-sass-middleware');
var path = require('path');

// var favicon = require('serve-favicon');

const app = express();

app.use(sassMiddleware({
  src: __dirname + '/client/stylesheets',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static(__dirname + '/public'))

app.set('models', require('./server/models/'));

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: '*/*' })); // any incoming request regardless of type will be parsed as json

// Router
routes(app);

module.exports = app;
