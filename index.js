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
      if (items.length === 0) {
        collection.insertOne({
          post: 'about',
          text: 'empty',
          url: 'none'
        }).then(() => {
          collection.find({post: 'about'}).toArray((err, items) => {
            if (err) throw err
            res.json(items[0])
          })
        })
        client.close()
        return
      }
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
        collection.find({post: 'about'}).toArray((err, items) => {
          if (err) throw err
          res.json(items[0])
          client.close()
        })
      })
    })
  }
  else res.sendStatus(403)
})

app.listen(process.env.PORT, () => {
  console.log('Server is listening on port', process.env.PORT)
})
