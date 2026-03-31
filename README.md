# ALPFA NJIT Website Source Code
ALPFA NJIT is the official chapter website for the Association of Latino Professionals for America at NJIT. This site provides information about our mission, events, membership, and executive board.

**Tech Stack**
- React / Next.js / Vite (whichever)
- Tailwind CSS
- HTML / CSS / JavaScript
- Google Calendar API

## Getting Started
- npm install to install all the packages
- npm run dev to run on local host

## Localhost Full Stack Setup
Run the backend and frontend in separate terminals.

### Backend (Python + SQLite)
1. `cd backend`
2. `python3 server.py`

Backend API runs at `http://localhost:8000`.

### Frontend (Vite)
1. `npm install`
2. `npm run dev`

Frontend runs at `http://localhost:5173`.

If needed, set `VITE_API_BASE_URL=http://localhost:8000` in a `.env` file at the project root.

## Production Deployment (Recommended)

### Architecture
- Frontend: GitHub Pages
- Backend API: Render (Python Web Service)

### 1) Deploy backend to Render
1. Push this repo to GitHub.
2. In Render, create a new Blueprint and select this repo.
3. Render will use `render.yaml` to create the backend service and persistent disk automatically.
4. Set environment variable `ALLOWED_ORIGINS` to your frontend origins (comma-separated), for example:
	`https://your-username.github.io,http://localhost:5173`
5. After deploy, copy your backend URL (example: `https://your-api.onrender.com`).

The blueprint stores SQLite at `/var/data/alpfa_points.db` using a Render disk so data survives restarts.

### 2) Configure frontend API URL
Create `.env.production` at project root with:

```bash
VITE_API_BASE_URL=https://your-api.onrender.com
```

### 3) Deploy frontend to GitHub Pages
1. In GitHub repo settings, enable Pages and set Source to `GitHub Actions`.
2. Add repo secret `VITE_API_BASE_URL` with your Render backend URL.
3. Push to `main`.

This project includes a workflow at `.github/workflows/deploy-pages.yml` that builds and deploys automatically.

### Optional manual deploy
1. Install deps: `npm install`
2. Publish: `npm run deploy`

### Notes
- If backend is offline, the points widget now shows a friendly service-unavailable message.
- If your backend domain changes, update `VITE_API_BASE_URL` and run `npm run deploy` again.

## Contributing
1. Create a new branch: `git checkout -b feature-branch`
2. Commit changes: `git commit -m "Add feature"`
3. Get new changes from main `git pull origin branchname` 
4. Push branch: `git push origin feature-branch`
5. Open a **pull request** to develop for review

## 📬 Contact
Email: alpfanjit@gmail.com  
Instagram: @alpfa_njit  

