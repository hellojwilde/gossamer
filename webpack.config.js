var path = require('path');
var webpack = require('webpack');

var SRC = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:6060',
    'webpack/hot/only-dev-server',
    './main.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '.build'),
    publicPath: '/.build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      // Because webpack doesn't support ES6 features like arrow functions and
      // const currently (see https://github.com/webpack/webpack/issues/532),
      // we have to run all of the code in SRC through babel to transpile.
      {
        test: /\.js$/, 
        include: [SRC], 
        loaders: ['react-hot', 'babel-loader?optional[]=runtime']
      },

      // By default, node supports loading JSON via require(). Webpack does not,
      // so we have to shim that functionality with json-loader.
      {
        test: /\.json$/, 
        loader: 'json-loader'
      },

      // In order to make omniscient work, we need to expose react on window
      // (see https://github.com/omniscientjs/omniscient/issues/45).
      {
        test: require.resolve('react'),
        loader: 'expose?React'
      }
    ]
  },
  resolve: {
    root: SRC,
    alias: {
      'uuid': 'node-uuid',
      'typed-immutable': 'typed-immutable/lib/'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
