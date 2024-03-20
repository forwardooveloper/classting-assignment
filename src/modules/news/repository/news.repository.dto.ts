export type CreateNewsDto = {
  title: string;
  content: string;
  createdAt: number;
};

export type UpdateNewsDto = {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
};
