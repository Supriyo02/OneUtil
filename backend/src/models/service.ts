import mongoose from "mongoose";

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

const serviceSchema = new mongoose.Schema<ServiceType>({
  userId: {type: String, required: true},
  name: {type: String, required: true},
  city: {type: String, required: true},
  country: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  facilities: [{type: String, required: true}],
  pricePerService: {type: Number, required: true},
  starRating: {type: Number, required: true, min:1, max:5},
  imageUrls: [{type: String, required: true}],
  lastUpdated: {type: Date, required: true},
});

const Service = mongoose.model<ServiceType>("Service", serviceSchema);

export default Service;
