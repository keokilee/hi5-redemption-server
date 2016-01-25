'use strict'

const path = require('path')

const nodemon = require('nodemon')
const webpack = require('webpack')

const config = require('./webpack.config')

let started = false

nodemon({
  execMap: { js: 'node' },
  script: path.join(__dirname, 'build/server.js'),
  ignore: ['*'],
  watch: ['noop/'],
  ext: 'noop'
}).on('restart', () => console.log('Restarted'))

webpack(config).watch(100, () => {
  if (!started) {
    started = true
  } else {
    nodemon.restart()
  }
})
