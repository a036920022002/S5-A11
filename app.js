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
  console.log(name)
  return originalURL.findOne({ originURL: name })
    .then(originURL => {
      if (!originURL) {
        const shortURL = createshort
        return originalURL.create({
          originURL: `${name}`,
          shortURL: `${host}/${shortURL}`
        }).then(() => res.render('index', { originalURL: name, shortURL: host + '/' + shortURL, host }))
          .catch(error => console.log('error!!'))
      }
      else {
        const shortURL = originURL.shortURL
        res.render('index', { originalURL: name, shortURL: shortURL })

      }
    })
    .catch(error => console.log('no found'))
})

app.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  const host = req.get('host')
  //console.log('shortURL', shortURL)
  //console.log('host', `${host}/${shortURL}`)
  originalURL.findOne({ shortURL: `${host}/${shortURL}` })
    .then(data => {
      //console.log(data)
      //console.log(data.originURL)

      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        })
      }
      res.redirect(data.originURL)
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})