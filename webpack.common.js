const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    "DOMElementRelocation": './src/DOMElementRelocation.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "-----------------------------------------------------------------------------------" +
        "\nTHIS FILE IS A COMPILED VERSION. IF YOU WANT TO EDIT AND COMPILE SOURCE GO TO src DIR.\n" +
        "-----------------------------------------------------------------------------------"
    })
  ]
}
