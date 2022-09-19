require('../../config/mongoose')

const URL = require('../originalURL')
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!!')
  
})

function createshort() {
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
}
