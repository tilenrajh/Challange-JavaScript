const puppeteer = require("puppeteer");
const fs = require('fs');
const { title } = require("process");

const PAGE_URL =
  "https://www.hansimmo.be/appartement-te-koop-in-borgerhout/10161";

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(PAGE_URL);

  const items = await page.evaluate(() => {
    // write your querySelectors here

    if(document.querySelector('body > main > section#detail-description > article > div#description')){
      description = document.querySelector('body > main > section#detail-description > article > div#description').textContent;
    }else{ description = '';}

    if(document.querySelector('body > main > section#detail-description > article > h2')){
      title = document.querySelector('body > main > section#detail-description > article > h2').textContent;
    }else{ title = '';}

    if(document.querySelector('body > main > section#detail-description > article > div#detail-title > div.price')){
      price = document.querySelector('body > main > section#detail-description > article > div#detail-title > div.price').textContent;
    }else{ price = '';}

    if(document.querySelector('body > main > section#detail-description > article > div#detail-title > div.address')){
      address = document.querySelector('body > main > section#detail-description > article > div#detail-title > div.address').textContent;
    }else{ address = '';}

    return {
      description: description,
      title: title,
      price: price,
      address: address,
    };
  });

  await browser.close();

  //console.log(items);
  let data = JSON.stringify(items, null, 2);

  fs.writeFile('items.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file.');
  });

  return items;
};

main().then((data) => console.log(data));
