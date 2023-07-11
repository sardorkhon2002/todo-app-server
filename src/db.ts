import pkg from "pg";
import { Task } from "./interfaces";
import * as process from "process";

const { Pool } = pkg;

const pool = new Pool({
  database: process.env.DB_NAME || "todo",
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD || "root",
  port: Number.parseInt(process.env.DB_PORT || "5432"),
  user: process.env.DB_USER || "postgres",
  max: 20,
});

export async function getTasks() {
  const client = await pool.connect();
  const result = await client.query("SELECT * FROM task");
  const tasks: any = result.rows;
  client.release();
  return tasks;
}

export async function createTask(task: Task) {
  const { id, title, status } = task;
  const client = await pool.connect();
  const result = await client.query(
    "INSERT INTO task (id, title, status) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET title = $2, status = $3 RETURNING *",
    [id, title, status]
  );
  const newTask = result.rows[0];
  client.release();
  return newTask;
}

export async function updateTask(task: Task) {
  const { id, title, status } = task;
  const client = await pool.connect();
  const result = await client.query(
    `UPDATE task SET title = $1, status = $2, "updatedAt" = now() WHERE id = $3 RETURNING *`,
    [title, status, id]
  );
  if (result.rows.length === 0) {
    throw new Error("Not Found");
  }
  client.release();
  return result.rows[0];
}

export async function deleteTask(id: string) {
  const client = await pool.connect();

  const result = await client.query("DELETE FROM task WHERE id = $1", [id]);
  client.release();
}
