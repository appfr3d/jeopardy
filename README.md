# Jeopardy Board

Local Jeopardy style game built with Vite + React + TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5173`).

## Edit content

Update `public/board-config.json`.

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
