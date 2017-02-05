const path = require("path");
module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
    ]
  },
};
