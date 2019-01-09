require('dotenv/config')

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/about', (req, res) => {
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    const db = client.db('local')
    const collection = db.collection('about')
    collection.find({post: 'about'}).toArray((err, items) => {
      if (err) throw err
      res.json(items[0])
      client.close()
    })
  })
})

app.get('/category', (req, res) => {
  const category = req.query.cat
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) throw err
    const db = client.db('local')
    const collection = db.collection(category)
    collection.find({post: category}).toArray((err, items) => {
      if (err) throw err
      res.json(items[0])
      client.close()
    })
  })
})

app.put('/about', (req, res) => {
  if (req.query.id === process.env.ADMIN_ID) {
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
      if (err) throw err
      const db = client.db('local')
      const collection = db.collection('about')
      collection.updateOne({post: 'about'}, {
        $set: {
          text: req.body.text,
          url: req.body.url
        }
      }, (err) => {
        if (err) throw err
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
      if (err) throw err
      const db = client.db('local')
      const collection = db.collection(category)
      collection.updateOne({post: category}, {
        $set: {
          text: req.body.text
        }
      }, (err) => {
        if (err) throw err
        res.sendStatus(200)
      })
    })
  }
  else res.sendStatus(403)
})

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port', process.env.PORT)
})
