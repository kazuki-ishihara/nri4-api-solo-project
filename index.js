const server = require("./server");

const app = server();

app.listen(3000, () => {
  console.log("App running on port 3000");
});
