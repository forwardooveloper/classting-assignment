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
