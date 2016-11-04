var path = require('path');
var Promise = require('es6-promise').polyfill();

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    client: './src/client.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public')
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=/public/img/[name]-[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  }
}
