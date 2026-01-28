# Discord (local project)

# Discord (local project)

This repository contains a backend (Node/TypeScript) and an Electron frontend. The instructions below show how to run the backend and database with Docker and how to run the Electron frontend locally.

## Prerequisites

- Docker / Docker Compose
- Node.js and npm (for local Electron frontend)

## Run with Docker (recommended for backend + DB)

Build and start the services:

```bash
docker compose up -d --build
```

Check container status:

```bash
docker compose ps
```

Follow logs (backend / db):

```bash
docker compose logs -f app
docker compose logs -f db
```

Rebuild without cache (if you changed dependencies or `.dockerignore`):

```bash
docker compose build --no-cache app
docker compose up -d --force-recreate app db
```

Stop and remove containers and the DB volume:

```bash
docker compose down -v
```

## Notes and recommendations

- Native modules (for example `wrtc`) are built inside the image. Do not mount the host `backend` directory over `/app/backend` in production or CI — that will overwrite the image `node_modules` and commonly causes `invalid ELF header` errors. For local development you can mount the code, but ignore `node_modules` in `.dockerignore` or mount an anonymous volume for `/app/backend/node_modules`.
- If you need MySQL access from the host, set a host port mapping in `docker-compose.yml` (for example `3307:3306`).
- Keep credentials out of the repo; use a `.env` file instead. Example `.env`:

```env
# .env (example)
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=my_db
MYSQL_USER=user
MYSQL_PASSWORD=password
```

## Run Electron frontend locally

The frontend is an Electron app located in `frontend/`. Run it locally:

```bash
cd frontend
npm install
npm start
```

## Troubleshooting

- `Cannot find package 'ws'` — ensure `node_modules` were installed inside the image and not overwritten by a host mount.
- `invalid ELF header` — usually a native binary compiled for a different platform landed in the container (e.g. Windows `node_modules` copied into a Linux image). Rebuild inside the container and avoid copying host `node_modules`.

---

README created/updated automatically.

