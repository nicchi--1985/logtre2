var path = require('path')

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    client: './src/client.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
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
      }
    ]
  }
}
