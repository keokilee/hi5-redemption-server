'use strict'

const webpack = require('webpack')
const fs = require('fs')
const path = require('path')

const modules = fs.readdirSync('node_modules')
                  .filter(m => ['.bin'].indexOf(m) === -1)
                  .reduce((acc, m) => {
                    acc[m] = `commonjs ${m}`
                    return acc
                  }, {})

module.exports = {
  context: process.cwd(),
  devtool: 'sourcemap',
  entry: {
    server: path.join(process.cwd(), 'app', 'index.js'),
    loader: path.join(process.cwd(), 'app', 'locations', 'loader.js')
  },
  externals: modules,
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  },
  output: {
    path: 'build/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.BannerPlugin({ banner: 'require("source-map-support").install();',
                               raw: true, entryOnly: false })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  target: 'node'
}
