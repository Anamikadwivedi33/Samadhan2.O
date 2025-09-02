import React from 'react';
import TaskCard from './TaskCard.jsx';

export default function Column({ id, title, tasks, onAdd }) {
  return (
    <div style={{ background: '#fafafa', border: '1px solid #ddd', borderRadius: 8, padding: 12, minHeight: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <button onClick={onAdd}>+ Add</button>
      </div>
      <div>
        {tasks.map((t, idx) => (
          <TaskCard key={t._id} id={`${id}::${idx}`} task={t} />
        ))}
      </div>
    </div>
  );
}
