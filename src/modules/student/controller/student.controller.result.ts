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
