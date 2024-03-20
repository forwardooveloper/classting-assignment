export type AddSchoolDto = {
  name: string;
  region: string;
};

export type AddNewsDto = {
  id: string;
  title: string;
  content: string;
};

export type ModifyNewsDto = {
  id: string;
  newsId: string;
  title: string;
  content: string;
};

export type DeleteNewsDto = {
  id: string;
  newsId: string;
};
