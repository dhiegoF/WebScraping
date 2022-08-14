const fs = require('fs-extra')

const __main__ = "__main__"

async function main() {
  while(true) {
    try {
      const workingFile = fs.readFileSync('./dist_incomplete/code.json').toString().split('\n')
      const completeWork = JSON.stringify(fs.readJSONSync('./dist/code.json')).split(',')

      let finded = false

      const lastRow = workingFile.reverse()[0]
      const lastAlpha = lastRow.match(/"[A-Z][A-Z]"/g)

      for(let line of completeWork) {
        if(finded) {
          console.log(line)

          finded = false
        }

        if(line.indexOf(lastAlpha) != -1) {
          finded = true
        }
      }
    }catch(_) {
      // pass
    }
  }
}

if(__main__ == "__main__") {
  main()
}