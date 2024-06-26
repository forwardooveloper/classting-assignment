export type AffectResult = {
  affectedId: string;
};

export type GetSchoolResult = {
  schoolId: string;
  name: string;
  region: string;
};

export type GetSubscriptionListResult = {
  id: string;
  schoolId: string;
  schoolName: string;
  schoolRegion: string;
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

export type GetNewsListBySchoolIdListResult = {
  schoolId: string;
  newsList: {
    id: string;
    title: string;
    content: string;
  }[];
};
