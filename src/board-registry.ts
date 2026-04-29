import alfredBoard from "./boards/alfred.json";
import arnyBoard from "./boards/arny.json";
import type { BoardConfig } from "./types";

type BoardTheme = {
  pageTop: string;
  pageBottom: string;
  shellBg: string;
  shellStroke: string;
  shellShadow: string;
  headerText: string;
  categoryBg: string;
  categoryText: string;
  cellBg: string;
  cellBorder: string;
  cellHoverShadow: string;
  overlayStart: string;
  overlayEnd: string;
  overlayText: string;
  answerText: string;
  emptyCell: string;
  focusRing: string;
  statusText: string;
  orb1: string;
  orb2: string;
};

type RoutedBoard = {
  path: string;
  config: BoardConfig;
  theme: BoardTheme;
};

const routedBoards: Record<string, RoutedBoard> = {
  arny: {
    path: "/arny",
    config: arnyBoard,
    theme: {
      pageTop: "#fef1f8",
      pageBottom: "#fdeccf",
      shellBg: "rgba(255, 255, 255, 0.7)",
      shellStroke: "rgba(255, 163, 203, 0.5)",
      shellShadow: "0 12px 30px rgba(174, 90, 138, 0.14)",
      headerText: "#7a3d6f",
      categoryBg: "#ffcce3",
      categoryText: "#6b3b61",
      cellBg: "#fffaf3",
      cellBorder: "#f7b4d2",
      cellHoverShadow: "0 6px 15px rgba(182, 92, 145, 0.2)",
      overlayStart: "#ffa8cf",
      overlayEnd: "#ffb696",
      overlayText: "#ffffff",
      answerText: "#76415f",
      emptyCell: "rgba(255, 228, 239, 0.55)",
      focusRing: "#f0649f",
      statusText: "#7d496c",
      orb1: "#ffd7ea",
      orb2: "#ffe7ca",
    },
  },
  alfred: {
    path: "/alfred",
    config: alfredBoard,
    theme: {
      pageTop: "#eef7ff",
      pageBottom: "#d6e7ff",
      shellBg: "rgba(246, 250, 255, 0.78)",
      shellStroke: "rgba(100, 144, 214, 0.42)",
      shellShadow: "0 14px 34px rgba(42, 82, 145, 0.18)",
      headerText: "#24466f",
      categoryBg: "#bed8ff",
      categoryText: "#17385d",
      cellBg: "#f9fbff",
      cellBorder: "#9ec2f7",
      cellHoverShadow: "0 8px 18px rgba(63, 103, 173, 0.2)",
      overlayStart: "#69a7ff",
      overlayEnd: "#76d2d8",
      overlayText: "#fefefe",
      answerText: "#1f4068",
      emptyCell: "rgba(206, 225, 248, 0.5)",
      focusRing: "#2f7ef7",
      statusText: "#34557d",
      orb1: "#b8dbff",
      orb2: "#c7f2ec",
    },
  },
};

const defaultBoardKey = "arny";

export const defaultBoardPath = routedBoards[defaultBoardKey].path;

function stripTrailingSlash(value: string): string {
  if (value.length <= 1) {
    return value;
  }

  return value.replace(/\/+$/, "") || "/";
}

function toRelativePath(pathname: string, baseUrl: string): string {
  const normalizedBase = stripTrailingSlash(baseUrl);

  if (normalizedBase !== "/" && pathname.startsWith(normalizedBase)) {
    return pathname.slice(normalizedBase.length) || "/";
  }

  return pathname || "/";
}

export function resolveBoard(pathname: string, baseUrl: string): RoutedBoard {
  const relativePath = stripTrailingSlash(toRelativePath(pathname, baseUrl));
  const boardKey = relativePath.split("/").filter(Boolean)[0] ?? defaultBoardKey;

  return routedBoards[boardKey] ?? routedBoards[defaultBoardKey];
}