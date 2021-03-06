const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging framework
const routes = require('./routes');
const socket = require('socket.io');
const onlineUsers = require('./server/online_users');
const path = require('path');

// var favicon = require('serve-favicon');

const app = express();

// sass
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
  src: __dirname + '/client/stylesheets',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed'
}));

// webpack
if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig), {
    noInfo: true
  }));
}

app.use(express.static(__dirname + '/public'))

app.set('models', require('./server/models/'));

// App Setup
// app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: '*/*' })); // any incoming request regardless of type will be parsed as json

// Server
const server = http.createServer(app);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

server.listen(port, function(err) {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`Server (${process.env.NODE_ENV || 'development'}) is running at localhost:${port}`);
  }
});

// Socket.io
const io = socket(server);
onlineUsers(io);

// Router
routes(app);

module.exports = app;
