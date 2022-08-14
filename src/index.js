const fs = require("fs-extra");
const cheerio = require("cheerio");
const axios = require("axios");

const __main__ = "__main__";

async function main() {
  const { data } = await axios.get(
    "https://www.rallybel.com/pt/links_iso_code2.html",
    {responseType: 'arraybuffer',
    reponseEncoding: 'binary'}
  );

  const $ = cheerio.load(data.toString('latin1'), { decodeEntities: false });

  const rows = [];
  let formattedRow = {};

  $("table tr").each(function (i, e) {
    const row = [];
    
    rows.push(row);
    $(this)
      .find("th")
      .each(function (i, e) {
        row.push($(this).text().trim());
      });
    $(this)
      .find("td")
      .each(function (i, e) {
        row.push($(this).text().trim());
      });
  });

  for(let row of rows) {
    const [alpha2, country, alpha3, alphaCode] = row

    formattedRow[alpha2] = country
  }

  for(let row in formattedRow) {
    if(row.length != 2) {
        delete formattedRow[row]
    }
  }

  fs.writeJSONSync('./dist/code.json', formattedRow)
}

if (__main__ == "__main__") {
  main();
}