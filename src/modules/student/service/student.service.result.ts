export type AddSubscriptionResult = {
  affectedId: string;
};

export type GetSchoolResult = {
  schoolId: string;
  name: string;
  region: string;
};

export type FindSubscriptionListResult = {
  id: string;
  schoolList: {
    schoolId: string;
    schoolName: string;
    schoolRegion: string;
  }[];
};

export type DeleteSubscriptionResult = {
  affectedId: string;
};

export type FindSchoolWithNewsListResult = {
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
