const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require("axios");

const BOT_TOKEN = "6706934976:AAGrz5Z78fu7JMjiihN7H60bX7nfBsTWm2M";
const CHAT_ID = "-1002043998874";
const sendToTelegram = (error) => {
  axios
    .post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: JSON.stringify(error),
    })
    .catch(function (error) {
      console.log(error);
    });
};

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    try {
      fs.readFile(path.join(__dirname, '/', 'index.html'), (err, content) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
      });
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
      console.error('Error reading index.html:', err);
      sendToTelegram(`Error reading index.html: ${err}`)
    }
  } else if (req.url === '/log.json') {
    try {
      fs.readFile(path.join(__dirname, '/', 'log.json'), (err, content) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(content);
      });
    } catch (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Internal Server Error');
      console.error('Error reading log.json:', err);
      sendToTelegram(`Error reading log.json: ${err}`)
    }
  }
});

const PORT = 3015;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
