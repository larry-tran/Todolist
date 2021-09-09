const { Todo } = require("../models");

const todo = {
  async createTodo(req, res, next) {
    try {
      const { title } = req.body;
      const { userId } = req.decoded;
      const todo = await Todo.create({ title, userId });
      return res.status(201).send(todo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async getAllTodo(req, res, next) {
    try {
      const myTodos = await Todo.findAll({
        where: { userId: req.decoded.userId },
      });
      return res.status(200).send(myTodos);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async getTodo(req, res, next) {
    try {
      const myTodo = await Todo.findOne({
        where: { id: req.params.todoId, userId: req.decoded.userId },
      });
      if (!myTodo) return res.status(404).send({ error: "Todo not found" });
      return res.status(200).send(myTodo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async updateTodo({ body, decoded, params }, res, next) {
    try {
      const todo = await Todo.findOne({
        where: { id: params.todoId, userId: decoded.userId },
      });
      console.log("checkcheck");
      if (!todo) return res.status(400).send({ error: "wrong todo id" });
      const updatedTodo = await Todo.update(
        { title: body.title },
        {
          where: {
            id: params.todoId,
          },
        }
      );
      return res.status(200).send(updatedTodo);
    } catch (e) {
      return next(new Error(e));
    }
  },

  async deleteTodo({ params, decoded }, res, next) {
    try {
      const todo = await Todo.findOne({
        where: { id: params.todoId, userId: decoded.userId },
      });
      if (!todo) return res.status(400).send({ error: "wrong todo Id" });
      await todo.destroy();
      return res.status(200).send({});
    } catch (e) {
      return next(new Error(e));
    }
  },
};

module.exports = todo;
