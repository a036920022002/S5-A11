const { model } = require("mongoose")

function createshort() {
  console.log("function success!!")
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  let shortcollection = []
  let shortURL = ''
  shortcollection = numbers.split('').concat(lowerCaseLetters.split('')).concat(upperCaseLetters.split(''))

  for (let i = 0; i <= 5; i++) {
    shortURL += shortcollection[index(shortcollection)]
  }

  return shortURL
}

function index(array) {
  const index = Math.floor(Math.random() * array.length)
  return index
}

module.exports = createshort()