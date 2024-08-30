const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
 
app.use(express.json());
app.use(cookieParser());


app.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send({ status: false, owner: 'SACHIBOT', err: 'Need site URL!' });

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    });

    let retries = 3;
    let html;
    while (retries > 0) {
      try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        html = await page.content();
        await browser.close();
        break;
      } catch (e) {
        console.error(`Attempt failed. Retries left: ${retries - 1}`);
        retries--;
        if (retries === 0) {
          throw e;
        }
      }
    }

    return res.status(200).send(html);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
