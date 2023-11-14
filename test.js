const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
chai.should();
const { todos } = require("./data/jsonindex.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("GET /todos", () => {
  it("should return 200 /todos", async () => {
    const res = await chai.request(server()).get("/todos");
    res.should.be.html;
    expect(res.statusCode).to.equal(200);
  });
  it("should return the JSON for { hello: world }", async () => {
    const res = await chai.request(server()).get("/hellojson");
    res.should.be.json;
    expect(res.body).to.deep.equal({ hello: "world" });
  });

  it("should return the alltodos", async () => {
    const res = await chai.request(server()).get("/allTodos");
    res.should.be.json;
    expect(res.body).to.deep.equal(todos);
  });
});

describe("POST /newtodo - add new todo", () => {
  it("should return add new todo", async () => {
    // 準備
    const addData = {
      userId: 11,
      id: 101,
      title: "new-todo",
      completed: false,
    };
    const res = await chai
      .request(server())
      .post("/newtodo/11/101/new-todo/false");

    //検証
    res.should.be.json;
    console.log(res.body);
    res.body.should.deep.equal(addData);
  });
});
