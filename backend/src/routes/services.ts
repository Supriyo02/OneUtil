import express, {Request, Response} from "express";
import Service from "../models/service";
import { ServiceSearchResponse } from "../shared/types";

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