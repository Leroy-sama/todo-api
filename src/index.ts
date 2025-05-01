import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRouter from "./routes/todoRouter";
import bodyParser from "body-parser";

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(bodyParser.json());

if (!process.env.DATABASE_URL || !process.env.DATABASE_PASSWORD) {
	throw new Error("Database configuration missing");
}

const dbUrl = process.env.DATABASE_URL.replace(
	"<db_password>",
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(dbUrl)
	.then((con) => console.log("Database connection successful"))
	.catch((err) => console.log("db connection error", err.message));

app.use("/", todoRouter);

const port = process.env.PORT || 4400;
app.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
