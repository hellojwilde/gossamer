var path = require('path');
var webpack = require('webpack');

var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var NoErrorsPlugin = webpack.NoErrorsPlugin;

var SRC = path.join(__dirname, 'src');

function getEntrypoint(src) {
  return [
    'webpack/hot/poll?2000',
    src
  ];
}

module.exports = {
  entry: {
    main: getEntrypoint(path.join(__dirname, 'main.js')),
    aboutSettings: getEntrypoint(path.join(SRC, '/about/settings/index.js'))
  },
  resolve: {
    root: SRC,
    alias: {
      'uuid': 'node-uuid',
      'typed-immutable': 'typed-immutable/lib/'
    }
  },
  module: {
    loaders: [
      {test : new RegExp('\.js$'), loader: 'react-hot', include: SRC},

      // By default, node supports loading JSON via require(). Webpack does not,
      // so we have to shim that functionality with json-loader.
      {test: new RegExp('\.json$'), loader: 'json-loader'}
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname, '.build'),
    publicPath: '/.build/',
    filename: '[name].entry.js'
  }
};
