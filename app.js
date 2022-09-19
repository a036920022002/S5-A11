const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')

const app = express()
const port = 3000


app.get('/', (req, res) => {
  res.render('index')
})

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})