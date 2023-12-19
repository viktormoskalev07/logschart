const http = require('http');
const fs = require('fs');
const path = require('path');
const {sendToTelegram} = require("./helpers");


const server = http.createServer((req, res) => {
  try {
    if (req.url === '/') {
      // Отдаем index.html
      fs.readFile(path.join(__dirname, '/', 'index.html'), (err, content) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
          console.error('Error reading index.html:', err);
          sendToTelegram(`Error reading index.html: ${err}`)
          return;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
      });
    } else if (req.url === '/log.json') {
      // Отдаем log.json
      fs.readFile(path.join(__dirname, '/', 'log.json'), (err, content) => {
        if (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end('Internal Server Error');
          console.error('Error reading log.json:', err);
          sendToTelegram(`Error reading log.json: ${err}`)
          return;
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(content);
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not Found');
      console.error('Error reading index.html');
      sendToTelegram('Error reading index.html')
    }
  } catch (error) {
    console.error('Error handling request:', error);
  }
});

const PORT = 3015;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
