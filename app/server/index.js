'use strict'

import express from 'express'
import redis from 'redis'
import Promise from 'bluebird'

Promise.promisifyAll(redis)
Promise.promisifyAll(express)

const app = express()

const PORT = process.env.PORT || 8081
const KEY = process.env.KEY || 'hi5:locations'

app.get('/', (req, res) => {
  const client = redis.createClient()
  client.getAsync(KEY).then(locations => {
    res.json(JSON.parse(locations))
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
