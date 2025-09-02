import React, { useEffect, useMemo, useState } from 'react';
import { api, setToken } from './api.js';
import Board from './components/Board.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState(null);

  useEffect(() => {
    // quick demo login/register
    const email = 'demo@example.com';
    const password = 'demopass';
    (async () => {
      try {
        const { token, user } = await api.login(email, password);
        setUser(user); setToken(token);
      } catch {
        const { token, user } = await api.register('Demo User', email, password);
        setUser(user); setToken(token);
      }
      const projects = await api.listProjects();
      let p = projects[0];
      if (!p) p = await api.createProject('Demo Project');
      setProject(p);
    })();
  }, []);

  if (!user || !project) return <div style={{ padding: 24 }}>Loading…</div>;
  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Task Manager — {project.name}</h1>
      <Board project={project} />
    </div>
  );
}
