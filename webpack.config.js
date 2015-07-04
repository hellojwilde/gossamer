var path = require('path');

var SRC = path.resolve(__dirname, 'src');

module.exports = {
  entry: './main.js',
  devtool: 'cheap-module-source-map',
  output: {
    path: './.build',
    publicPath: '/.build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
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
