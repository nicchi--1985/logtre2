var path = require('path')

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    client: './src/client.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/client')
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
