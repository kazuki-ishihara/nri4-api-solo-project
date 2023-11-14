const express = require("express");
const { todos } = require("./data/jsonindex.js");
console.log(todos[0]);

function server() {
  const app = express();
  app.use(express.json());

  app.get("/todos", (req, res) => {
    res.status(200).send("world");
  });

  app.get("/hellojson", (req, res) => {
    const a = { hello: "world" };
    res.json(a);
  });

  app.get("/allTodos", (req, res) => {
    res.json(todos);
  });

  app.post("/newtodo/:userId/:id/:title/:completed", (req, res) => {
    console.log("-----------------------------------------------------");
    if (!req.params.compreted) {
      req.params.compreted = false;
    }
    const data = {
      userId: Number(req.params.userId),
      id: Number(req.params.id),
      title: req.params.title,
      completed: req.params.compreted,
    };

    console.log(data);
    todos.push(data);
    res.send(todos[todos.length - 1]);
  });

  return app;
}

module.exports = server;
