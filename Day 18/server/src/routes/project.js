import express from 'express';
import Project from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { name, columns } = req.body;
  const project = await Project.create({
    name,
    owner: req.user.id,
    members: [req.user.id],
    columns: columns || [
      { _id: 'todo', title: 'To Do', order: 0 },
      { _id: 'doing', title: 'In Progress', order: 1 },
      { _id: 'done', title: 'Done', order: 2 }
    ]
  });
  res.json(project);
});

router.get('/', async (req, res) => {
  const projects = await Project.find({ members: req.user.id }).lean();
  res.json(projects);
});

router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id).lean();
  res.json(project);
});

router.post('/:id/members', async (req, res) => {
  const { userId } = req.body;
  const project = await Project.findByIdAndUpdate(req.params.id, { $addToSet: { members: userId } }, { new: true });
  res.json(project);
});

export default router;
