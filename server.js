const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BOT_TOKEN = '6706934976:AAGrz5Z78fu7JMjiihN7H60bX7nfBsTWm2M';
const CHAT_ID = '-1002043998874';

const sendToTelegram = (error) => {
  axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    chat_id: CHAT_ID,
    text: JSON.stringify(error),
  })
    .catch((axiosError) => {
      console.error(axiosError);
    });
};

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    try {
      const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    } catch (err) {
      internalServerError(res, `Error reading index.html: ${err}`);
    }
  } else if (req.url === '/log.json') {
    readFileAndRespond(res, 'log.json', 'application/json').then()
  } else {
    notFoundResponse(res);
  }
});

const readFileAndRespond = async (res, fileName, contentType) => {
  try {
    const content = await fs.readFileSync(path.join(__dirname, fileName), 'utf-8');
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    internalServerError(res, `Error reading ${fileName}: ${err}`);
  }
};

const notFoundResponse = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
  console.error('Resource not found');
  sendToTelegram('Resource not found');
};

const internalServerError = (res, err) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Internal Server Error');
  console.error(err);
  sendToTelegram('Internal Server Error', err);
};

const PORT = 3015;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
