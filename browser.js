const puppeteer = require('puppeteer');
const {URLSearchParams} = require('url');
const submit  = require('./submit');

(async function(){
  const browser = await puppeteer.launch({headless: false});
  const url = 'http://scooterlabs.com/echo';
  const page = await browser.newPage();

  const cookies = [{
    'name': 'cookie1',
    'value': 'val1',
    'domain': 'scooterlabs.com'
  }];

  await page.setCookie(...cookies);

  await submit(page, 'http://scooterlabs.com/echo', new URLSearchParams('a=1&b=2'));
})()
