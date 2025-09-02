import React, { useEffect, useMemo, useState } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { io } from 'socket.io-client';
import { api } from '../api.js';
import Column from './Column.jsx';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Board({ project }) {
  const [tasks, setTasks] = useState([]);
  const [socket, setSocket] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    (async () => {
      const t = await api.listTasks(project._id);
      setTasks(t);
    })();

    const token = localStorage.getItem('token') || null;
    const s = io(API_BASE, { auth: { token } });
    s.emit('project:join', { projectId: project._id });
    s.on('task:created', ({ task }) => setTasks(prev => [...prev, task]));
    s.on('task:updated', ({ task }) => setTasks(prev => prev.map(t => t._id === task._id ? task : t)));
    s.on('task:deleted', ({ taskId }) => setTasks(prev => prev.filter(t => t._id !== taskId)));
    setSocket(s);
    return () => s.disconnect();
  }, [project._id]);

  const columns = project.columns.sort((a,b)=> a.order - b.order);
  const tasksByCol = useMemo(() => {
    const map = Object.fromEntries(columns.map(c => [c._id, []]));
    tasks.forEach(t => map[t.status]?.push(t));
    Object.values(map).forEach(arr => arr.sort((a,b)=> a.order - b.order));
    return map;
  }, [tasks, project._id]);

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    const [fromCol, fromIdx] = active.id.split('::'); // `${status}::${index}`
    const [toCol] = over.id.split('::');

    if (fromCol === toCol) return; // column drag only for brevity

    const moved = tasksByCol[fromCol][parseInt(fromIdx,10)];
    const newOrder = (tasksByCol[toCol]?.length || 0);

    const patch = { status: toCol, order: newOrder };
    const updated = await api.updateTask(moved._id, patch);
    setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));
    socket?.emit('task:update', { projectId: project._id, task: updated });
  }

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const progress = total ? Math.round((done/total)*100) : 0;

  async function quickAdd(colId) {
    const title = prompt('Task title?');
    if (!title) return;
    const task = await api.createTask({ project: project._id, title, status: colId, order: tasksByCol[colId].length });
    setTasks(prev => [...prev, task]);
    socket?.emit('task:create', { projectId: project._id, task });
  }

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <strong>Progress:</strong> {progress}%
        <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden', maxWidth: 320 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#4caf50' }} />
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns.length}, 1fr)`, gap: 16 }}>
          {columns.map(col => (
            <SortableContext key={col._id} items={tasksByCol[col._id].map((t, idx) => `${col._id}::${idx}`)} strategy={rectSortingStrategy}>
              <Column
                id={col._id}
                title={col.title}
                tasks={tasksByCol[col._id]}
                onAdd={() => quickAdd(col._id)}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
