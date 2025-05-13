import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let currentId = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and Description are required' });
  }

  const newTask = { id: currentId++, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id); // id ko number me convert karo
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json(task);
});


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
