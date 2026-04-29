import { useMemo, useState } from "react";
import boardConfigData from "./board-config.json";
import type { BoardConfig, BoardItem } from "./types";

function getCellKey(categoryIndex: number, points: number): string {
  return `${categoryIndex}-${points}`;
}

function App() {
  const boardConfig: BoardConfig = boardConfigData;
  const [opened, setOpened] = useState<Set<string>>(new Set());

  const pointRows = useMemo(() => {
    const points = new Set<number>();

    for (const category of boardConfig.categories) {
      for (const item of category.items) {
        points.add(item.points);
      }
    }

    return [...points].sort((a, b) => a - b);
  }, [boardConfig]);

  const itemMap = useMemo(() => {
    const map = new Map<string, BoardItem>();

    boardConfig.categories.forEach((category, categoryIndex) => {
      category.items.forEach((item) => {
        map.set(getCellKey(categoryIndex, item.points), item);
      });
    });

    return map;
  }, [boardConfig]);

  const revealCell = (key: string) => {
    setOpened((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  return (
    <main className="page">
      <div className="background-orb orb-1" />
      <div className="background-orb orb-2" />

      <section className="board-shell">
        <header className="board-header">
          <h1>{boardConfig.title}</h1>
        </header>

        <div
          className="board-grid"
          style={{
            gridTemplateColumns: `repeat(${boardConfig.categories.length}, minmax(0, 1fr))`,
          }}
        >
          {boardConfig.categories.map((category) => (
            <div key={category.name} className="category-title">
              {category.name}
            </div>
          ))}

          {pointRows.map((points) =>
            boardConfig.categories.map((_, categoryIndex) => {
              const key = getCellKey(categoryIndex, points);
              const item = itemMap.get(key);
              const isOpen = opened.has(key);

              if (!item) {
                return <div key={key} className="cell missing" />;
              }

              return (
                <button
                  key={key}
                  type="button"
                  className={`cell ${isOpen ? "open" : ""}`}
                  onClick={() => revealCell(key)}
                >
                  <div className="answer">{item.answer}</div>
                  {!isOpen && <div className="overlay">{item.points}</div>}
                </button>
              );
            }),
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
