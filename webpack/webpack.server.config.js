const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, '../server.ts'),
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts)$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  plugins: [new NodemonPlugin()],
  performance: { hints: false },
  externals: [nodeExternals()],
};
