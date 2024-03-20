export type NewsChangedEventType = {
  schoolId: string;
  news: {
    id: string;
    title: string;
    content: string;
  };
};
