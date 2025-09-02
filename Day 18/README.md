# Task Manager Starter (Drag & Drop • Team Collaboration • Progress Tracking)

A minimal full‑stack starter:
- **Frontend**: React + Vite + `@dnd-kit` for drag‑and‑drop, Socket.IO client for realtime, simple progress bar.
- **Backend**: Node + Express + MongoDB (Mongoose), JWT auth, Socket.IO for realtime collaboration.
- **Features**: Kanban board (todo/doing/done), drag tasks between columns, realtime updates across clients, project members, progress % complete.

## Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# edit if needed (MONGO_URI, CLIENT_ORIGIN)
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
npm install
npm run dev
```
Open the printed URL (default http://localhost:5173). On first run the app auto-registers a demo account and creates a demo project.

## API Notes
- `POST /api/auth/register {name,email,password}` → `{ token, user }`
- `POST /api/auth/login {email,password}` → `{ token, user }`
- `POST /api/projects {name}` (auth) → project
- `GET /api/projects` (auth) → projects for user
- `GET /api/projects/:id` (auth)
- `GET /api/tasks/project/:projectId` (auth) → tasks
- `POST /api/tasks` (auth) → create
- `PUT /api/tasks/:id` (auth) → update (e.g., `{ status, order, title }`)
- `DELETE /api/tasks/:id` (auth)

## Realtime
- Client joins room: `project:join { projectId }`
- Broadcasts:
  - `task:create { projectId, task }`
  - `task:update { projectId, task }`
  - `task:delete { projectId, taskId }`

## Next Steps / Ideas
- Role-based permissions per project
- Comments & activity feed per task
- File attachments (S3, Cloudinary)
- Analytics (burndown, velocity)
- Notifications (email/push)
- Unit/integration tests
- Docker compose for Mongo + server + client
```

