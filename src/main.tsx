import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { defaultBoardPath } from "./board-registry";
import "./styles.css";

function toRelativePath(pathname: string, baseUrl: string): string {
  const normalizedBase = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");

  if (normalizedBase && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || "/";
  }

  return pathname || "/";
}

function redirectBasePathToDefaultBoard() {
  const baseUrl = import.meta.env.BASE_URL;
  const basePath = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");
  const relativePath = toRelativePath(window.location.pathname, baseUrl);

  if (relativePath !== "/") {
    return;
  }

  const nextUrl = `${basePath}${defaultBoardPath}${window.location.search}${window.location.hash}`;
  window.history.replaceState(null, "", nextUrl);
}

function restoreRedirectedBoardPath() {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectedBoardPath = searchParams.get("boardPath");

  if (!redirectedBoardPath) {
    return;
  }

  searchParams.delete("boardPath");

  const normalizedBoardPath = redirectedBoardPath.startsWith("/")
    ? redirectedBoardPath
    : `/${redirectedBoardPath}`;
  const baseUrl = import.meta.env.BASE_URL;
  const basePath = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");
  const remainingSearch = searchParams.toString();
  const nextUrl = `${basePath}${normalizedBoardPath}${
    remainingSearch ? `?${remainingSearch}` : ""
  }${window.location.hash}`;

  window.history.replaceState(null, "", nextUrl);
}

restoreRedirectedBoardPath();
redirectBasePathToDefaultBoard();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
