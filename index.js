const express = require('express')
const bodyParser = require('body-parser')
const IORedis = require('ioredis')

// Connect to redis
let redis
function connectToRedis () {
  try {
    redis = new IORedis(6379, 'redis')
    console.log('Connected to redis')
  } catch (e) {
    // Try again in 5 mins
    redis = null
    setTimeout(connectToRedis, 300)
    console.log('Redis is down right now')
  }
}
connectToRedis()

async function cache (url, text, ttl) {
  if (redis) {
    console.log(`Setting ${url} with ttl ${ttl}`)
    await redis.set(url, text)
    return redis.expire(url, ttl)
  } else {
    return Promise.resolve(null)
  }
}

function fetchFromCache (url) {
  if (redis) {
    return redis.get(url)
  } else {
    return Promise.resolve(null)
  }
}


let app = new express()
app.use(bodyParser())
app.set('view engine', 'ejs')

let name = 'Jenkins'

app.use(async function redisViewCounter(req, res, next) {
    let currentCount = 0
    try {
        currentCount = (await fetchFromCache('count')) || 0
        await cache('count', parseInt(currentCount) + 1, 300)
    }
    catch(e) {
        console.log(e)
    }
    res.locals.count = currentCount
    next()
})

app.post('/', function saveName(req, res, next) {
    if(req.body['name']) {
        name = req.body['name']
    }
    next()
})

app.use(function serveIndex(req, res, next) {
    res.render('index', {
        name: name,
        count: res.locals.count
    })
})


let server = app.listen(process.env.PORT || 3000, function() { console.log('listening on port 3000') })
