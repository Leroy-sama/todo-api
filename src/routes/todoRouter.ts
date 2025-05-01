import { Router } from "express";
import { getAllTodos, createNewTodo } from "../controllers/todoController";

const router = Router();

router.route("/api/todos").get(getAllTodos).post(createNewTodo);

export default router;
