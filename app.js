const express = require('express')
require('./config/mongoose')

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.send('new express+mongoose')
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})