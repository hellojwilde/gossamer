var path = require('path');
var webpack = require('webpack');

function getPrebuiltModulePath(moduleName) {
  return path.join(__dirname, 'node_modules', moduleName, 'dist', moduleName+'.js');
}

function getHotEntrypoint(src) {
  return [
    'webpack/hot/poll?2000',
    src
  ];
}

var SRC = path.join(__dirname, 'src');
var REACT_PATH = getPrebuiltModulePath('react');
var POUCHDB_PATH = getPrebuiltModulePath('pouchdb');
var OMNISCIENT_PATH = getPrebuiltModulePath('omniscient');

module.exports = {
  entry: {
    main: getHotEntrypoint(path.join(__dirname, 'main.js')),
    aboutSettings: getHotEntrypoint(path.join(SRC, '/about/settings/index.js'))
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
      {test: new RegExp('\.json$'), loader: 'json-loader', include: SRC},

      // Omniscient when noParse is turned on errors without window.React.
      // Related to <https://github.com/omniscientjs/omniscient/issues/45>.
      {test: REACT_PATH, loader: 'expose-loader?React'}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __GOSSAMER_HOST__: JSON.stringify(process.env.GOSSAMER_HOST || null),
      __GOSSAMER_BUILD_ID__: JSON.stringify(process.env.GOSSAMER_BUILD_ID || null)
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'cheap-source-map',

  output: {
    path: path.join(__dirname, '.build'),
    publicPath: '/.build/',
    filename: '[name].entry.js'
  }
};
