import { deleteTask, getTasks, createTask, updateTask } from "./db";
import { app, io } from "./app";

io.on("connection", async (socket) => {
  console.log("a user connected");

  socket.on("tasks:subscribe", async () => {
    const tasks = await getTasks();
    socket.join("tasks");
    await socket.emit("tasks", tasks);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/tasks", getTasks);
app.post("/tasks", async (req, res) => {
  const task = req.body;
  io.to("tasks").emit("tasks", [await createTask(task)]);
  res.send({ status: "ok" });
});
app.put("/tasks/:taskId", async (req, res) => {
  const task = req.body;
  const taskId = req.params.taskId;
  io.to("tasks").emit("tasks", [await updateTask(task)]);
  res.send({ status: "ok" });
});
app.delete("/tasks/:taskId", async (req, res) => {
  await deleteTask(req.params.taskId);
  io.to("tasks").emit("tasks", [
    { id: req.params.taskId, deletedAt: new Date() },
  ]);
  res.send({ status: "ok" });
});
