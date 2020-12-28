const path = require('path');

module.exports = {
  entry: ['./src/index.ts'],
  devtool: 'inline-source-map',
  output: {
    filename: 'volume-File.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'volumeFile',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  mode: 'development'
};