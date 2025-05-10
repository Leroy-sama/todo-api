import express from "express";
import {
	getTodos,
	getTodoById,
	createTodo,
	deleteTodoById,
	updateTodoById,
} from "../models/todoModel";

export const createNewTodo = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { task, completed, priority } = req.body;
		console.log(req.body);

		if (!task) {
			res.status(400).json({
				status: "fail",
				message: "Please provide the task to create a todo",
			});
			return;
		}

		const todoData = {
			task,
			...(completed !== undefined && { completed }),
			...(priority !== undefined && { priority }),
		};

		const todo = await createTodo(todoData);
		console.log(todo);

		res.status(200).json({
			status: "success",
			message: "todo created",
			data: todo,
		});
		return;
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			message: err.message,
		});
		return;
	}
};

export const getTodo = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;
		const todo = await getTodoById(id);
		res.status(200).json({
			status: "success",
			data: {
				todo,
			},
		});
		return;
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			message: err.message,
		});
		return;
	}
};

export const getAllTodos = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const todos = await getTodos();
		console.log(todos);

		res.status(200).json({
			status: "success",
			message: "todos were found",
			data: todos,
		});
		return;
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			message: err.message,
		});
		return;
	}
};

export const updateTodo = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const { task, completed, priority } = req.body;

		const todo = await getTodoById(id);

		if (!todo) {
			res.status(404).json({
				status: "fail",
				message: "todo not found",
			});
			return;
		}

		const updatedTodo = await updateTodoById(id, {
			task,
			completed,
			priority,
		});
		res.status(200).json({
			status: "success",
			data: updatedTodo,
		});
		return;
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			message: err.message,
		});
		return;
	}
};

export const deleteTodo = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;
		const deleteTodo = await deleteTodoById(id);

		if (!deleteTodo) {
			res.status(404).json({
				status: "fail",
				message: "Todo not found or already deleted",
			});
			return;
		}

		res.status(204).send();
		return;
	} catch (err) {
		console.log(err);
		res.status(400).json({
			status: "Fail",
			message: err.message,
		});
		return;
	}
};
