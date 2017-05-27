var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname,'../.src/script.js'),
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: 'script.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true}),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      '$': 'jQuery',
      'Object.assign': 'object-assign'
    })
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', {}]],
            plugins: [['transform-object-rest-spread', {"useBuiltIns": true}]]
          }
        }
      }
    ]
  }
};