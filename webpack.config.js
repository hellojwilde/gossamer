var path = require('path');

var SRC = path.resolve(__dirname, 'src');

module.exports = {
  entry: './main.js',
  devtool: 'source-map',
  output: {
    path: './.build',
    publicPath: '/.build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // Because webpack doesn't support ES6 features like arrow functions and
      // const currently (see https://github.com/webpack/webpack/issues/532),
      // we have to run all of the code in SRC through babel to transpile.
      {test: /\.js$/, include: [SRC], loader: 'babel-loader?optional[]=runtime'},

      // By default, node supports loading JSON via require(). Webpack does not,
      // so we have to shim that functionality with json-loader.
      {test: /\.json$/, loader: 'json-loader'},

      // In order to make omniscient work, we need to expose react on window
      // (see https://github.com/omniscientjs/omniscient/issues/45).
      {test: require.resolve('react'), loader: 'expose?React'}
    ]
  },
  resolve: {
    root: SRC,
    alias: {
      'uuid': 'node-uuid',
      'typed-immutable': 'typed-immutable/lib/'
    }
  }
};
