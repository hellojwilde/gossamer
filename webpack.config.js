var path = require('path');
var webpack = require('webpack');

var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;
var NoErrorsPlugin = webpack.NoErrorsPlugin;

var SRC = path.join(__dirname, 'src');

function getEntrypoint(src) {
  return [
    'webpack/hot/poll?400',
    src
  ];
}

module.exports = {
  entry: {
    main: getEntrypoint('./main.js'),
    aboutSettings: getEntrypoint('./src/about/settings/index.js')
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
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin()
  ],
  devtool: 'cheap-source-map',
  output: {
    path: path.join(__dirname, '.build'),
    publicPath: '/.build/',
    filename: '[name].entry.js'
  }
};
