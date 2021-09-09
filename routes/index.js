const auth = require("../controllers/authController");
const todos = require("../controllers/todosController");
const validAuth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");

const routes = (app) => {
  app.post("/api/auth/signup", validAuth, auth.signUp);
  app.post("/api/auth/signin", auth.signIn);

  app.post("/api/todos", authorize, todos.createTodo);
  app.get("/api/todos", authorize, todos.getAllTodo);
  app.get("/api/todos/:todoId", authorize, todos.getTodo);
  app.put("/api/todos/:todoId", authorize, todos.updateTodo);
  app.delete("/api/todos/:todoId", authorize, todos.deleteTodo);
};

module.exports = routes;
