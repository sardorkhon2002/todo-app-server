import knex from "knex";
import { Task } from "./interfaces";

const db = knex({
  client: "pg",
  connection: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "root",
    database: process.env.DB_NAME || "todo",
    host: process.env.INSTANCE_CONNECTION_NAME || "localhost",
  },
});

export async function getTasks() {
  const tasks = await db.select().from("task");
  return tasks;
}

export async function createTask(task: Task) {
  const [newTask] = await db("task")
    .insert(task)
    .onConflict("id")
    .merge(["title", "status"]);

  return newTask;
}

export async function updateTask(task: Task) {
  const { id, title, status } = task;

  const updatedTask = await db("task")
    .where("id", id)
    .update({
      title,
      status,
      updatedAt: db.raw("now()"),
    })
    .returning("*");

  if (updatedTask.length === 0) {
    throw new Error("Not Found");
  }

  return updatedTask[0];
}

export async function deleteTask(id: string) {
  const deletedTask = await db("task").where("id", id).del();

  if (deletedTask === 0) {
    throw new Error("Not Found");
  }
}
