import mongoose from "mongoose";
import { BookingType, ServiceType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  serviceDate: {type: Date, required: true},
  userId: {type: String, required: true},
  totalCost: {type: Number, required: true},
})

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
  bookings: [bookingSchema],
});

const Service = mongoose.model<ServiceType>("Service", serviceSchema);

export default Service;
