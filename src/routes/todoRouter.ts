import { Router } from "express";
import {
	getAllTodos,
	createNewTodo,
	getTodo,
	updateTodo,
	deleteTodo,
} from "../controllers/todoController";

const router = Router();

router.route("/api/todos").get(getAllTodos).post(createNewTodo);
router.route("/api/todos/:id").get(getTodo).patch(updateTodo);

export default router;
