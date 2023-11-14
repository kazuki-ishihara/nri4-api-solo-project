const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
chai.should();
const { todos } = require("./data/jsonindex.js");

const expect = chai.expect;

chai.use(chaiHttp);

describe("GET /hello", () => {
  it("should return 200 /hello", async () => {
    const res = await chai.request(server()).get("/hello");
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
      id: 201,
      title: "new-todo",
      completed: false,
    };
    const res = await chai
      .request(server())
      .post("/newtodo/11/201/new-todo/false");

    //検証
    res.should.be.json;
    res.body.should.deep.equal(addData);
  });
});
describe("get /newtodo - add new todo", () => {
  it("should return the JSON for addData", async () => {
    // 準備
    const addData = {
      userId: 11,
      id: 201,
      title: "new-todo",
      completed: false,
    };
    const res = await chai.request(server()).get("/todos").query(addData);

    //検証
    res.should.be.json;
    // expect(res.body).should.deep.equal(addData);
    res.body.should.have.property("userId").eql(11);
    res.body.should.have.property("id").eql(201);
    res.body.should.have.property("title").eql("new-todo");
    res.body.should.have.property("completed").eql(false);
  });
});
