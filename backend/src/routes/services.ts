import express, {Request, Response} from "express";
import Service from "../models/service";
import { BookingType, ServiceSearchResponse } from "../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/search", async(req: Request, res:Response )=>{
  try{
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch(req.query.sortOption) {
      case "starRating":
        sortOptions = {starRating: -1};
        break;
      case "pricePerServiceAsc":
        sortOptions = {pricePerService: 1};
        break;
      case "pricePerServiceDesc":
        sortOptions = {pricePerService: -1};
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNumber-1)*pageSize;
    
    const services = await Service.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

    const total = await Service.countDocuments(query);
    
    const respone: ServiceSearchResponse = {
      data: services,
      pagination :{
        total, 
        page: pageNumber,
        pages: Math.ceil(total/pageSize),
      },
    };

    res.json(respone);

  } catch(error){
    console.log("error", error);
    res.status(500).json({message: "Something went wrong"});
  }
});

router.get("/", async(req: Request, res: Response)=>{
  try{
    const services = await Service.find().sort("-lastUpdated");
    res.json(services);
  }catch(error){
    console.log("error", error);
    res.status(500).json({message: "Error fetching hotels"});
  }
})

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Service ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const service = await Service.findById(id);
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching service." });
    }
  }
);

router.post("/:serviceId/bookings/payment-intent", verifyToken, async(req: Request, res: Response)=>{
  const serviceId = req.params.serviceId;

  const service= await Service.findById(serviceId);
  if(!service){
    return res.status(400).json({message: "Service not found"});
  }

  const totalCost = service.pricePerService;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "inr",
    metadata:{
      serviceId,
      userId: req.userId,
    },
  });

  if(!paymentIntent.client_secret){
    return res.status(500).json({message: "Error creating payment intent"});
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);

});

router.post("/:serviceId/bookings", verifyToken, async(req: Request, res: Response)=>{
  try{
    const paymentIntentId=req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if(!paymentIntent){
      return res.status(400).json({message: "Payment intent not found"});
    }

    if(
      paymentIntent.metadata.serviceId !== req.params.serviceId || 
      paymentIntent.metadata.userId !== req.userId){
        return res.status(400).json({message: "payment intent mismatch"});
    }

    if(paymentIntent.status !== "succeeded"){
      return res.status(400).json({message: `paymeny intent not succeeded. Status: ${paymentIntent.status}`});
    }

    const newBooking: BookingType ={
      ...req.body,
      userId: req.userId,
    };

    const service = await Service.findOneAndUpdate(
      {_id: req.params.serviceId}, 
      {
       $push: {bookings:newBooking},
    });

    if(!service){
      return res.status(400).json({message: "Service not found"});
    }

    await service.save();
    res.status(200).send();

  } catch(error){
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
})

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.serviceTitle && queryParams.location) {
    constructedQuery = {
      $and: [
        { name: new RegExp(queryParams.serviceTitle, "i") },
        { $or: [{ city: new RegExp(queryParams.location, "i") }, { country: new RegExp(queryParams.location, "i") }] },
      ],
    };
  } else if (queryParams.serviceTitle) {
    constructedQuery = { name: new RegExp(queryParams.serviceTitle, "i") };
  } else if (queryParams.location) {
    constructedQuery = { $or: [{ city: new RegExp(queryParams.location, "i") }, { country: new RegExp(queryParams.location, "i") }] };
  }

  // if (queryParams.serviceTitle) {
  //   constructedQuery.$or = [
  //     { name: new RegExp(queryParams.serviceTitle, "i") },
  //   ];
  // }

  // if (queryParams.location) {
  //   constructedQuery.$or = [
  //     { city: new RegExp(queryParams.location, "i") },
  //     { country: new RegExp(queryParams.location, "i") },
  //   ];
  // }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);

    constructedQuery.starRating = { $in: starRatings };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerService = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

export default router;