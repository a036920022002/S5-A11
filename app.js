const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000
const MY_ENV = process.env.MY_ENV
mongoose.connect(MY_ENV, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('connect error')
})
db.once('open', () => {
  console.log('mongodb connected!!')
})

app.get('/', (req, res) => {
  res.send('new express')
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})