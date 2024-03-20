export type CreateSchoolDto = {
  name: string;
  region: string;
  createdAt: number;
};

export type CreateNewsDto = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
};

export type UpdateNewsDto = {
  id: string;
  newsId: string;
  title: string;
  content: string;
  updatedAt: number;
};

export type DeleteNewsDto = {
  id: string;
  newsId: string;
};

export type GetNewsDto = {
  id: string;
  newsId: string;
};
