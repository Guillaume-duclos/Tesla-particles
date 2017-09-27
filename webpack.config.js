const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const dev = process.env.NODE_ENV === 'dev';

let config = {
  entry: './src/app.js',
  watch: true,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: []
}

/*if(!dev) {
  config.plugins.push(new UglifyJSPlugin())
}*/

module.exports = config
