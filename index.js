const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const { exec } = require('child_process');
app.use(express.json());
app.use(cookieParser());


exec('node node_modules/puppeteer/install.mjs', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

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


    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    const html = await page.content();

    await browser.close();

    return res.status(200).send(html);
  } catch (e) {
    console.log(e);
    res.json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
