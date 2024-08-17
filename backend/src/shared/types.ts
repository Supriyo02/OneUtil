export type ServiceType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  facilities: string[];
  pricePerService: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type ServiceSearchResponse = {
  data: ServiceType[];
  pagination:{
    total: number;
    page: number;
    pages: number,
  }
}