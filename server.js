const express = require("express");
const { todos } = require("./data/jsonindex.js");

function server() {
  const app = express();
  app.use(express.json());

  app.get("/hello", (req, res) => {
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
    if (!req.params.compreted) {
      req.params.compreted = false;
    }
    const data = {
      userId: Number(req.params.userId),
      id: Number(req.params.id),
      title: req.params.title,
      completed: req.params.compreted,
    };

    todos.push(data);
    res.send(todos[todos.length - 1]);
  });

  app.get("/todos", (req, res) => {
    getTodos = todos.filter((todo) => todo.id == req.query.id);
    res.json(getTodos[0]);
  });

  return app;
}

module.exports = server;
