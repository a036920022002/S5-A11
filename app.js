const express = require('express')
const exphbs = require('express-handlebars')
const db = require('./config/mongoose')
const bodyParser = require('body-parser')
const originalURL = require('./models/originalURL')
const createshort = require('./createshort')


const app = express()
const port = 3000
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

//顯示首頁
app.get('/', (req, res) => {
  res.render('index')
})

//抓取輸入的網址+建立新資料
app.post('/shortURL', (req, res) => {
  const name = req.body.name
  console.log(req.body.name)
  const shortURL = createshort
  originalURL.find({ originURL: req.body.name })
    .then(console.log('found'))
    .catch(error => console.log('no found'))
  //   return originalURL.create({
  //     originURL: `${name}`,
  //     shortURL: `${shortURL}`
  //   })
  //     .then(() => res.render('short', { originalURL: name, shortURL: shortURL }))
  //     .catch(error => console.log('error!!'))
})



app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})