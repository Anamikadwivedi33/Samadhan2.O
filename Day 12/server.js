const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // temporary storage

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST new task
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  const newTask = { id: Date.now(), text };
  tasks.push(newTask);
  res.json(newTask);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ success: true });
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
