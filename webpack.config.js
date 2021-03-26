const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    publicPath: 'xuni'
  },
  devServer:{
    port: 8866,
    contentBase: "www"
  }
}