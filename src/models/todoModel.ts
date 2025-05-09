import mongoose from "mongoose";

interface Todo {
	task: string;
	completed: boolean;
	priority?: "low" | "medium" | "high";
}

const TodoSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, "Task must be at least 3 characters"],
		},
		completed: {
			type: Boolean,
			default: false,
		},
		priority: {
			type: String,
			enum: ["low", "medium", "high"],
			default: "medium",
		},
	},
	{
		timestamps: true,
	}
);

export const TodoModel = mongoose.model("Todo", TodoSchema);

export const getTodos = () => TodoModel.find();
export const getTodoById = (id: string) => TodoModel.findById(id);
export const createTodo = (todoValue: Todo) =>
	new TodoModel(todoValue).save().then((todo) => todo.toObject());
export const deleteTodoById = (id: string) =>
	TodoModel.findOneAndDelete({ _id: id });
export const updateTodoById = (id: string, todo: Todo) =>
	TodoModel.findByIdAndUpdate(id, todo, { new: true, runValidators: true });
