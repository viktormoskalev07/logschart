const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Отдаем index.html
        fs.readFile(path.join(__dirname, '/', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/log.json') {
        // Отдаем log.json
        fs.readFile(path.join(__dirname, '/', 'log.json'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(content);
        });
    }
});

const PORT = 3015;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
