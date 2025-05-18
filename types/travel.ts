export type Tag = {
  id: string;
  name: string;
  color: string;
};

export type Travel = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  coverImage: string;
  tags: Tag[];
};

export type TravelLog = {
  id: string;
  travelId: string;
  date: string;
  content: string;
  images: string[];
  location: string;
  weather: string;
  mood: string;
};

export type TravelListItem = Pick<
  Travel,
  | "id"
  | "title"
  | "coverImage"
  | "startDate"
  | "endDate"
  | "location"
  | "description"
>;

export type TravelDetail = Travel & {
  logs: TravelLog[];
};
