const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Trata a URL para buscar arquivos estáticos
  let filePath = req.url === '/' || req.url === '' 
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, req.url.split('?')[0]); // Ignora query params

  // Evita directory traversal attacks básicos
  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Acesso proibido');
    return;
  }

  // Verifica se o arquivo existe
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Se não achar o arquivo, tenta servir o index.html (fallback de SPA)
      filePath = path.join(__dirname, 'index.html');
      fs.readFile(filePath, (error, content) => {
        if (error) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end('Arquivo não encontrado');
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(content);
        }
      });
      return;
    }

    // Lê e serve o arquivo estático com o MIME type correspondente
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(`Erro interno do servidor: ${error.code}`);
      } else {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(content);
      }
    });
  });
});

// Função para iniciar escutando em uma porta
function startServer(port) {
  server.listen(port, () => {
    console.log(`==================================================`);
    console.log(`🚀 Servidor local iniciado com sucesso!`);
    console.log(`🔗 Acesse a aplicação em: http://localhost:${port}`);
    console.log(`==================================================`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Porta ${port} já está em uso, tentando porta ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Erro ao iniciar o servidor:', err);
    }
  });
}

startServer(PORT);
