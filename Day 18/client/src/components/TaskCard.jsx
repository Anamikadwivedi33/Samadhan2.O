import React from 'react';
import { useDraggable } from '@dnd-kit/core';

export default function TaskCard({ id, task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.6 : 1,
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)'
  };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{task.title}</strong>
      {task.description ? <div style={{ fontSize: 12, color: '#555' }}>{task.description}</div> : null}
    </div>
  );
}
