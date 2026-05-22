# TaskApp

A production-ready task management application with a modern SaaS dashboard, real-time synchronization, and secure JWT authentication.

## Features

- User registration, login, and role-based access
- JWT authentication with secure password hashing
- Task creation, editing, deletion, and status workflow
- Task priority, due dates, tags, search, and filtering
- Dashboard metrics, activity cards, and task details
- Real-time updates via Socket.IO and notifications
- Responsive mobile-first UI with Tailwind CSS
- Docker support for easy deployment

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, React Query, Zustand, Framer Motion, React Hook Form, Zod
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcryptjs, Socket.IO
- DevOps: Docker, docker-compose

## Folder Structure

- `/client` - React frontend application
  - `src/components` - reusable UI components
  - `src/pages` - React page views
  - `src/api` - Axios API clients
  - `src/store` - Zustand auth store
  - `src/hooks` - custom hooks
- `/server` - Express backend API
  - `src/controllers` - route controllers
  - `src/routes` - API route definitions
  - `src/models` - Mongoose schemas
  - `src/middleware` - authentication and error middleware
  - `src/config` - environment config and database connection
  - `src/utils` - helpers and Socket.IO setup
  - `src/seed` - seed script for sample data

## Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MongoDB (local or via Docker)

### Local setup

```bash
cd server
npm install
npm run dev
```

Open another shell:

```bash
cd client
npm install
npm run dev
```

### Docker setup

```bash
docker-compose up --build
```

### Environment variables

Copy `.env.example` to `.env` in both project roots as needed.

### Seed data

Run the backend seed script to create an admin account and sample task:

```bash
cd server
npm run seed
```

## API Documentation

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Testing

- Backend: `cd server && npm test`
- Frontend: `cd client && npm test`

## Notes

- The frontend build succeeds and the backend tests pass.
- Frontend test runner may require a supported Node architecture for Vitest native bindings.

## Screenshots

- Dashboard view
- Task board
- Authentication pages
- Profile page
