# Cloudflare Bot Detection Bypass

This project provides a simple Express.js server to bypass Cloudflare bot detection using Puppeteer Extra with the Stealth Plugin. It allows you to fetch and return the HTML content of any webpage by passing the URL as a query parameter.

## Features

- **Puppeteer Extra with Stealth Plugin**: Bypasses bot detection mechanisms used by Cloudflare.
- **Express.js Server**: Simple API server to fetch and return HTML content.
- **Headless Browser**: Runs the browser in headless mode with custom arguments for performance.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cloudflare-bypass.git
   cd cloudflare-bypass
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access it by visiting:

```
http://localhost:8000/?url=YOUR_TARGET_URL
```

Replace `YOUR_TARGET_URL` with the actual URL you want to scrape.

### Example:

```bash
http://localhost:8000/?url=https://example.com
```

This will return the HTML content of the specified URL.

## Project Structure

- `index.js`: Main entry point of the server.
- `package.json`: Contains project metadata and dependencies.

## Scripts

- `start`: Starts the Express.js server.