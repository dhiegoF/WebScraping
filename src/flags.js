const wget = require('wget')
const axios = require('axios')
const fs = require('fs-extra')

const data = fs.readJSONSync('./dist/code.json')

for(let alpha2 in data) {
  const formattedAlpha2 = alpha2.toLowerCase()
  const flagName = data[alpha2]

  const flagDest = `./dist/flags/${flagName}.png`

  
  wget.download(`https://countryflagsapi.com/png/${formattedAlpha2}`, flagDest)
}