var path = require('path');
var webpack = require('webpack');

var SRC = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:6060',
    'webpack/hot/only-dev-server',
    './main.js'
  ],
  resolve: {
    root: SRC,
    alias: {
      'uuid': 'node-uuid',
      'typed-immutable': 'typed-immutable/lib/'
    }
  },
  module: {
    loaders: [
      {test : /\.js$/, loader: 'react-hot', include: SRC},

      // By default, node supports loading JSON via require(). Webpack does not,
      // so we have to shim that functionality with json-loader.
      {test: /\.json$/, loader: 'json-loader'},

      // In order to make omniscient work, we need to expose react on window
      // (see https://github.com/omniscientjs/omniscient/issues/45).
      {test: require.resolve('react'), loader: 'expose?React'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname, '.build'),
    publicPath: '/.build/',
    filename: 'bundle.js'
  }
};
