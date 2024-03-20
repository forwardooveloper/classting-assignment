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
