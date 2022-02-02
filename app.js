const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if(err) {
    console.error("Errouuu!", err);
  } else {
    products = JSON.parse(data);
  }
});

// POST
app.post("/products", (req, res) => {
  const { name, price } = req.body; // dados do body da requisição
  const product = { 
    id: randomUUID(),
    name, 
    price 
  }
  
  products.push(product);

  handleProductFile();

  return res.json(product);
});

// GET
app.get("/products", (req, res) => {
  return res.json(products);
});

// GET:id
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find(product => product.id == id);

  return res.json(product)
});

// PUT:id
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body; // dados do body da requisição
  const { id } = req.params;

  const productIndex = products.findIndex(product => product.id == id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price
  }

  handleProductFile();

  return res.json({ message: "Produto alterado com sucesso" });
});

// DELETE
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex(product => product.id == id);
  products.splice(productIndex, 1);

  handleProductFile();

  return res.json({ message: "Produto deletado com sucesso!" })
});

function handleProductFile() {
  fs.writeFile("products.json", JSON.stringify(products), err => {
    if(err) {
      console.error("Errouuu!", err);
    } else {
      console.log("Produto inserido");
    }
  })
}

app.listen(4040, () => console.log("Servidor rodando na porta 4040"));