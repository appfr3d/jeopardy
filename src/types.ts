export type BoardItem = {
  points: number;
  answer: string;
};

export type Category = {
  name: string;
  items: BoardItem[];
};

export type BoardConfig = {
  title: string;
  categories: Category[];
};
