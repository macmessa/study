const express = require("express");
const server = express();

server.use(express.json());

// Query params = ?param=1
// Route params = /param/1
// Request body = { "name": "Marco", "gender": "m" }

const users = [
  { name: "Marco", gender: "m" },
  { name: "Ingridy", gender: "f" },
  { name: "Ivete", gender: "f" }
];

// Middleware global
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Method: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd("Request");
});

// Middlewares locais
function checkIdExists(req, res, next) {
  const index = req.params.index;

  if (!users[index]) {
    return res.status(400).json({ error: "Id not found" });
  }

  req.index = index;

  return next();
}

function checkUser(req, res, next) {
  if (!req.body.name || !req.body.gender) {
    return res.status(400).json({ error: "User name and gender are required" });
  }

  return next();
}

// Query param
server.get("/", (req, res) => {
  const name = req.query.name;

  return res.json({ message: `Olá ${name}!` });
});

// Route param
server.get("/users/:index", checkIdExists, (req, res) => {
  const genderText = users[req.index].gender === "m" ? "vindo" : "vinda";

  return res.json({
    message: `Seja bem ${genderText} ${users[req.index].name}`
  });
});

// Using all methods

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUser, (req, res) => {
  const { name, gender } = req.body;

  users.push({ name: name, gender: gender });

  return res.json(users);
});

server.put("/users/:index", checkIdExists, checkUser, (req, res) => {
  const { name, gender } = req.body;

  users[req.index] = { name: name, gender: gender };

  return res.json(users);
});

server.delete("/users/:index", checkIdExists, (req, res) => {
  users.splice(req.index, 1);

  return res.send();
});

server.listen(3000);
