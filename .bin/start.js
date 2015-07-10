#!/usr/bin/env node

var child = require('child_process');
var path = require('path');
var webpack = require('webpack');
var config = require('../webpack.config');

var WebpackDevServer = require('webpack-dev-server');

process.title = 'browser.html';

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(6060, 'localhost', function(err) {
  var app = child.spawn('/Applications/B2G.app/Contents/MacOS/graphene', [
    '--profile', './.profile', '--start-manifest=http://localhost:6060/manifest.webapp'
  ], {
    stdio: 'inherit',
    uid: process.getuid(),
    gid: process.getgid()
  });

  var exit = function(code) {
    app.kill();
    process.exit(code);
  }

  process.on('SIGINT', exit);
  app.on('close', exit);
});
