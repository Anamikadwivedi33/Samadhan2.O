import express from 'express';
import Task from '../models/Task.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
router.use(authMiddleware);

// Create task
router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// List by project
router.get('/project/:projectId', async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId }).lean();
  res.json(tasks);
});

// Update (status/order/title/etc.)
router.put('/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
