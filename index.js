const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
 
app.use(express.json());
app.use(cookieParser());

.eval const fs = require('fs');
const path = require('path');
const os = require('os');

// Function to find cache directories
function findCacheDirectories() {
  const homeDir = os.homedir();
  const cachePaths = [];

  // Common cache directories across different platforms
  const possibleCacheDirs = [
    path.join(homeDir, '.cache'),      // Common in Linux and macOS
    path.join(homeDir, 'AppData', 'Local', 'Temp'),   // Common in Windows
    path.join(homeDir, 'Library', 'Caches'),  // macOS
    path.join(homeDir, '.npm'),        // npm cache
    path.join(homeDir, '.config', 'cache'), // Config cache
  ];

  possibleCacheDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      cachePaths.push(dir);
    }
  });

  return cachePaths;
}

// Find and print cache directories
const cacheDirs = findCacheDirectories();
if (cacheDirs.length > 0) {
  let msg = 'Cache directories found:\n\n';
  cacheDirs.forEach(dir => msg+=dir+'\n');
console.log(msg)
} else {
  console.log('No cache directories found.');
}


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
