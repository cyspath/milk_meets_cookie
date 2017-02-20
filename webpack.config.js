var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'client');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders: [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel'},
      // { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      // { test: /\.css$/,  loader: "style-loader!css-loader" },
      // { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      // { test: /\.gif$/, loader: "url-loader?mimetype=image/png" },
      // { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: "url-loader?mimetype=application/font-woff" },
      // { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
    ]
  }
};

module.exports = config;
