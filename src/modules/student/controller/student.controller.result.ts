export type PostSubscriptionResult = {
  affectedId: string;
};

export type GetSubscriptionListResult = {
  id: string;
  schoolList: {
    schoolId: string;
    schoolName: string;
    schoolRegion: string;
  }[];
};

export type GetSchoolWithNewsListResult = {
  school: {
    id: string;
    name: string;
    region: string;
  };
  newsList: {
    id: string;
    title: string;
    content: string;
  }[];
};
