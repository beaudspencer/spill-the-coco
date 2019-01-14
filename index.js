require('dotenv/config')

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/about', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    const db = client.db('local')
    const collection = db.collection('about')
    collection.find({post: 'about'}).toArray((err, items) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.json(items[0])
      client.close()
    })
  })
})

app.get('/category', (req, res) => {
  const category = req.query.cat
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    const db = client.db('local')
    const collection = db.collection(category)
    collection.find({post: category}).toArray((err, items) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.json(items[0])
      client.close()
    })
  })
})

app.get('/post', (req, res) => {
  const postId = req.query.id
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    const db = client.db('local')
    const collection = db.collection('posts')
    collection.find({_id: ObjectId(postId)}).toArray((err, items) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.json(items)
      client.close()
    })
  })
})

app.get('/posts', (req, res) => {
  const category = req.query.cat
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
      res.sendStatus(500)
      return
    }
    const db = client.db('local')
    const collection = db.collection('posts')
    collection.find({category: category}).toArray((err, items) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.json(items)
      client.close()
    })
  })
})

app.put('/about', (req, res) => {
  if (req.query.id === process.env.ADMIN_ID) {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      const db = client.db('local')
      const collection = db.collection('about')
      collection.updateOne({post: 'about'}, {
        $set: {
          text: req.body.text,
          url: req.body.url
        }
      }, (err) => {
        if (err) {
          res.sendStatus(500)
          return
        }
        res.sendStatus(200)
      })
    })
  }
  else res.sendStatus(403)
})

app.put('/category', (req, res) => {
  const category = req.query.cat
  if (req.query.id === process.env.ADMIN_ID) {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      const db = client.db('local')
      const collection = db.collection(category)
      collection.updateOne({post: category}, {
        $set: {
          text: req.body.text
        }
      }, (err) => {
        if (err) {
          res.sendStatus(500)
          return
        }
        res.sendStatus(200)
      })
    })
  }
  else res.sendStatus(403)
})

app.post('/post', (req, res) => {
  if (req.query.id === process.env.ADMIN_ID) {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      const db = client.db('local')
      const collection = db.collection('posts')
      collection.insertOne(req.body, (err) => {
        if (err) {
          console.error(err)
          res.sendStatus(500)
          return
        }
        res.sendStatus(200)
      })
    })
  }
  else {
    res.sendStatus(403)
  }
})

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port', process.env.PORT)
})
