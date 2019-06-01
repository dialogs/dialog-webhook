const http = require('http');
const https = require('https');

function getRequest(url) {
  switch (url.protocol) {
    case 'http:':
      return http.request;
    case 'https:':
      return https.request;
    default:
      throw new Error(`Invalid webhook URL "${url.protocol}" protocol not supported.`);
  }
}

function webhook({ url, text }) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const request = getRequest(parsed);
    const req = request(parsed, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      res.on('data', () => {});
      res.on('error', () => {
        reject(new Error(`Webhook response processing failed due ${error.message}`));
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`Webhook failed with status ${res.statusCode}`));
        }
      })
    });

    req.on('error', (error) => {
      reject(new Error(`Webhook request failed due ${error.message}`));
    });

    req.write(JSON.stringify({ text }));
    req.end();
  });
}

module.exports = webhook;