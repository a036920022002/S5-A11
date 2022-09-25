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
app.post('/', (req, res) => {
  const name = req.body.name
  const host = req.get('host')
  
  return originalURL.findOne({ originURL: req.body.name })
    .then(originURL => {
      if (!originURL) {
        const shortURL = createshort
        return originalURL.create({
          originURL: `${name}`,
          shortURL: `${host}/${shortURL}`
        }).then(() => res.render('index', { originalURL: name, shortURL: shortURL, host }))
          .catch(error => console.log('error!!'))
      }
      else {
        const shortURL = originURL.shortURL
        res.render('index', { originalURL: name, shortURL: shortURL })
  
      }
    })
    .catch(error => console.log('no found'))
})

// app.get('/:shortURL', (req, res) => {
//   const shortURL = req.params
//   console.log('req.params', req.params)
//   console.log('req.params.name', req.params.shortURL)
// })

app.get('/:shortURL', (req, res) => {
  const host = req.get('host')
  console.log('host', host)
  const shortURL = req.params.shortURL
  console.log('shortURL', shortURL)
  const errorMsg = `${host}/${shortURL} is not exist`


  originalURL.findOne(req.params)
    .then(data =>
      data ? res.redirect(data.fullURL) : res.render('error', { errorMsg })
    )
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})