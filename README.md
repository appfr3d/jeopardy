# Jeopardy Board

Local Jeopardy style game built with Vite + React + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## Edit content

Update `src/board-config.json`.

Config format:

```json
{
  "title": "Your board title",
  "categories": [
    {
      "name": "Category name",
      "items": [
        { "points": 100, "answer": "Answer text" },
        { "points": 200, "answer": "Answer text" }
      ]
    }
  ]
}
```

- `categories` = columns
- `points` values define rows
- Clicking a tile reveals the `answer` beneath the points overlay
- Refreshing the page resets the board

## Deploy to GitHub Pages

This repo is configured to deploy to GitHub Pages at `/jeopardy/`.

1. Push this repository to GitHub.
2. In GitHub, open `Settings > Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` to trigger deployment.

The workflow builds the site and publishes the `dist/` output automatically.

Live URL:

`https://appfr3d.github.io/jeopardy/`

If the browser tries to load `/src/main.tsx`, GitHub Pages is still serving the repository root `index.html` instead of the built `dist/` site. That means Pages is still configured to deploy from a branch rather than from GitHub Actions.
