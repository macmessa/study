const express = require("express");
const server = express();

// Query params = ?param=1
// Route params = /param/1
// Request body = { "name": "Marco", "gender": "m" }

const users = [
  { name: "Marco", gender: "m" },
  { name: "Ingridy", gender: "f" },
  { name: "Ivete", gender: "f" }
];

// Query param
server.get("/", (req, res) => {
  const name = req.query.name;

  return res.json({ message: `Olá ${name}!` });
});

// Route param
server.get("/users/:index", (req, res) => {
  const { index } = req.params;
  const genderText = users[index].gender === "m" ? "vindo" : "vinda";

  return res.json({ message: `Seja bem ${genderText} ${users[index].name}` });
});

server.listen(3000);
