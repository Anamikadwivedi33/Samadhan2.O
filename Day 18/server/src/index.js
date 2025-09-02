import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/project.js';
import taskRoutes from './routes/task.js';
import { authMiddlewareSocket } from './middleware/auth.js';
import { registerSocketHandlers } from './socket.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }
});

// Mongo
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager')
  .then(()=> console.log('✅ MongoDB connected'))
  .catch(err=> console.error('Mongo error', err));

// Middleware
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || ['http://localhost:5173'], credentials: true }));
app.use(express.json());

// Routes
app.get('/', (_, res)=> res.json({ ok: true, msg: 'Task Manager API' }));
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Socket auth & handlers
io.use(authMiddlewareSocket);
io.on('connection', (socket) => {
  registerSocketHandlers(io, socket);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
