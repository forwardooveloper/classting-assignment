export type CreateSchoolDto = {
  name: string;
  region: string;
};

export type CreateNewsDto = {
  id: string;
  title: string;
  content: string;
};

export type UpdateNewsDto = {
  id: string;
  newsId: string;
  title: string;
  content: string;
};

export type DeleteNewsDto = {
  id: string;
  newsId: string;
};

export type GetNewsDto = {
  id: string;
  newsId: string;
};
