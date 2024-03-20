export type CreateSubscriptionDto = {
  id: string;
  schoolId: string;
  schoolName: string;
  schoolRegion: string;
};

export type DeleteSubscriptionDto = {
  id: string;
  schoolId: string;
};
