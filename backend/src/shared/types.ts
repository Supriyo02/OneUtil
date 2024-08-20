export type UserType={
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

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
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  serviceDate: Date;
  totalCost: number;
}

export type ServiceSearchResponse = {
  data: ServiceType[];
  pagination:{
    total: number;
    page: number;
    pages: number,
  }
}

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}