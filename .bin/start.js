#!/usr/bin/env node

var child = require('child_process');
var http = require('http');
var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('../webpack.config');

var WebpackDevServer = require('webpack-dev-server');

process.title = 'browser.html';

var server = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.resolve(__dirname, '..'),
  publicPath: webpackConfig.output.publicPath,
  hot: true
});

server.listen(6060, 'localhost');

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
