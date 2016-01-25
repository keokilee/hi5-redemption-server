'use strict'

import Promise from 'bluebird'
import dotenv from 'dotenv'
import request from 'request'
import redis from 'redis'

Promise.promisifyAll(redis)
Promise.promisifyAll(request)

function fetch (uri) {
  const opts = {
    uri,
    json: true
  }

  return request.getAsync(opts).then(({ body }) => {
    const client = redis.createClient()

    // Clean location attributes.
    const locations = body.features.map(({attributes, geometry}) => {
      return {
        ...attributes,
        geometry
      }
    })

    return Promise.all([
      client.setAsync(process.env.TIMESTAMP_KEY, JSON.stringify(new Date())),
      client.setAsync(process.env.KEY, JSON.stringify(locations))
    ])
  })
}

export default fetch

if (require.main === module) {
  dotenv.config()

  fetch(process.env.LOCATIONS_URL).then(() => {
    console.log('Done')
    process.exit(0)
  })
}
