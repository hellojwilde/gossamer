var path = require('path');
var webpack = require('webpack');

var HotModuleReplacementPlugin = webpack.HotModuleReplacementPlugin;

function getPrebuiltModulePath(moduleName) {
  return path.join(__dirname, 'node_modules', moduleName, 'dist', moduleName+'.js');
}

function getEntrypoint(src) {
  return [
    'webpack/hot/poll?400',
    src
  ];
}

var SRC = path.join(__dirname, 'src');
var REACT_PATH = getPrebuiltModulePath('react');
var POUCHDB_PATH = getPrebuiltModulePath('pouchdb');
var OMNISCIENT_PATH = getPrebuiltModulePath('omniscient');

module.exports = {
  entry: {
    main: getEntrypoint(path.join(__dirname, 'main.js')),
    aboutSettings: getEntrypoint(path.join(SRC, '/about/settings/index.js'))
  },

  resolve: {
    root: SRC,

    alias: {
      'uuid': 'node-uuid',
      'typed-immutable': 'typed-immutable/lib/',
      'react/lib': path.join(__dirname, 'node_modules', 'react', 'lib'),
      'react': REACT_PATH,
      'pouchdb': POUCHDB_PATH,
      'omniscient': OMNISCIENT_PATH
    }
  },

  module: {
    noParse: [REACT_PATH, POUCHDB_PATH, OMNISCIENT_PATH],

    loaders: [
      {test: new RegExp('\.js$'), loader: 'react-hot-loader', include: SRC},

      // By default, node supports loading JSON via require(). Webpack does not,
      // so we have to shim that functionality with json-loader.
      {test: new RegExp('\.json$'), loader: 'json-loader'},

      {test: REACT_PATH, loader: 'expose-loader?React'}
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
