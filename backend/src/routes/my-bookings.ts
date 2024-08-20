import express, {Request, Response} from 'express';
import verifyToken from '../middleware/auth';
import Service from '../models/service';
import { ServiceType } from '../shared/types';

const router = express.Router();

router.get("/", verifyToken, async(req:Request, res:Response)=>{
  try{
    const services = await Service.find({
      bookings: {$elemMatch: {userId: req.userId}},
    });

    const results = services.map((service)=>{
      const userBookings = service.bookings.filter((booking)=>
        booking.userId === req.userId
      );

      const serviceWithUserBookings: ServiceType={
        ...service.toObject(),
        bookings: userBookings,
      };

      return serviceWithUserBookings;
    });

    res.status(200).send(results);
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Unable to fetch bookings"});
  }
});

export default router;