const puppeteer = require("puppeteer");
const fs = require('fs');

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here

    return {
      description: document.querySelector('body > main > section#detail-description > article > div#description').textContent,
      title: document.querySelector('body > main > section#detail-description > article > h2').textContent,
      price: document.querySelector('body > main > section#detail-description > article > div#detail-title > div.price').textContent,
      address: document.querySelector('body > main > section#detail-description > article > div#detail-title > div.address').textContent,
    };
  });

  //console.log(items);
  let data = JSON.stringify(items, null, 2);

  fs.writeFile('items.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file.');
  });

  return items;
};

main().then((data) => console.log(data));
