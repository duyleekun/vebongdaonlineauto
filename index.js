const fetch = require("node-fetch");
const axios = require("axios")
const _ = require("lodash")
const Throttle = require('promise-parallel-throttle');
const url = require('url');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const puppeteer = require('puppeteer');
const {URLSearchParams} = require('url');
const submit  = require('./submit');
var cookie = require('cookie');

const path = 'https://postman-echo.com/post'
const domain = url.parse(path).hostname

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', data => {
    const byteArray = [...data]
    if (byteArray.length > 0 && byteArray[0] === 3) {
      console.log('^C')
      process.exit(1)
    }
    process.stdin.setRawMode(false)
    resolve(data.toString())
  }))
}

let templateCookie = cookie.parse("_gat_UV-108626640-2=ZOPI5BH653E4_11504695; _ga=GA1.2.498058206.1544411520; _gid=GA1.2.1558458836.1544411520; _gat_UA-108626640-2=1")
templateCookie = Object.keys(templateCookie).map(function(key, index) {
   return {
     'name': key,
     'value': templateCookie[key],
     'domain': domain
   }
});

(async function(){
  const browser = await puppeteer.launch({headless: false,devtools: true});
  for (let i = 0; i>=0; i++) {
    await keypress()

    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage();

    await page.setCookie(...templateCookie, {
      'name': 'JSESSIONID',
      'value': 'A2DA6E31063124908715152F92AC5A0C',
      'domain': domain
    });

    await submit(page, path, new URLSearchParams(`seatValue=2&priceValue=${_.sample(["200000","350000","500000","600000"])}`));
    await page.waitForNavigation()

  }

})()
return;

(async function functionName() {

 const queue = _.times(10000, i => async () => {
   const client = axios.create({
     baseURL: 'https://www.vebongdaonline.vn/',
     timeout: 10000,
     headers: {
       'content-type': 'application/json',
       'accept': 'application/json',
       'referer': 'https://www.vebongdaonline.vn/bookTicket',
       'authority': 'www.vebongdaonline.vn',
       'cookie': "_gat_UV-108626640-2=ZOPI5BH653E4_11504695; _ga=GA1.2.498058206.1544411520; _gid=GA1.2.1558458836.1544411520; JSESSIONID=A2DA6E31063124908715152F92AC5A0C; _gat_UA-108626640-2=1"
     }
   });
   try {
     const reqBody = {"matchId":"28","price":_.sample(["200000","350000","500000","600000"]),"seat":"1"}
     const res = await client.post("checkValidBookTicket", JSON.stringify(reqBody))
     console.dir(i)
     if (res.data != 'NG') {
       console.dir(reqBody)
       console.dir(res.data)
     }

   } catch (e) {
     console.dir(i)
     console.error(e.message)
   }
 });

 //Default Throttle runs with 5 promises parallel.
 const formattedNames = await Throttle.all(queue, {maxInProgress: 40});

})()
