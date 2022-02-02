const http = require('http');

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  if(req.url === "/produto") {
    res.end(JSON.stringify({
      data: "Rota Produto"
    }))
  }

  if(req.url === "/usuarios") {
    res.end(JSON.stringify({
      data: "Rota Usuarios"
    }))
  }
})

server.listen(8080, () => console.log("Servidor rodando na porta 8080"));