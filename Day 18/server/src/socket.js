// Basic realtime collaboration: join project room, broadcast task updates & board reorders
export function registerSocketHandlers(io, socket) {
  socket.on('project:join', ({ projectId }) => {
    socket.join(projectId);
    socket.emit('project:joined', { projectId });
  });

  socket.on('task:update', ({ projectId, task }) => {
    socket.to(projectId).emit('task:updated', { task });
  });

  socket.on('task:create', ({ projectId, task }) => {
    socket.to(projectId).emit('task:created', { task });
  });

  socket.on('task:delete', ({ projectId, taskId }) => {
    socket.to(projectId).emit('task:deleted', { taskId });
  });
}
