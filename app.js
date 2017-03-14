const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // logging framework
const routes = require('./routes');
const sassMiddleware = require('node-sass-middleware');
const socket = require('socket.io');

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

// Server
const server = http.createServer(app);

const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

server.listen(port, function(err) {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`MMC server is running at localhost:${port}`);
  }
});

// Socket.io
const io = socket(server);

io.on('connection', function(socket) {
  socket.on('chat message', function(message) {
    socket.broadcast.emit('chat message', message)
  })
})

module.exports = app;
