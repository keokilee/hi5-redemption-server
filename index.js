'use strict'

const express = require('express')
const redis = require('redis')

const app = express()
const redisClient = redis.createClient()

const PORT = process.env.PORT || 8081
const KEY = process.env.LOCATIONS_KEY || 'locations'

redisClient.on('error', err => {
  console.error(err)
  process.exit(1)
})

redisClient.hset(KEY, 'foo', 'bar', redis.print)

app.get('/', (_, res) => {
  redisClient.hgetall(KEY, (err, val) => {
    if (err) {
      throw err
    }

    res.json(val)
  })
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
