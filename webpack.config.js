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
  entry: path.join(process.cwd(), 'server', 'index.js'),
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
    filename: 'server.js'
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  target: 'node'
}
