import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from './../api-client';
import { AiFillStar } from "react-icons/ai";
import CustomerInfoForm from "../forms/CustomerInfoForm/CustomerInfoForm";

const Detail = ()=>{
  const {serviceId} = useParams();

  const {data:service} = useQuery("fetchServiceById", ()=>
    apiClient.fetchServiceById(serviceId as string), 
  {
      enabled: !!serviceId,
    }
  );

  if(!service){
    return <></>
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex ">
          {Array.from({length: service.starRating}).map(()=>(
            <AiFillStar className="fill-black" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{service.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {service.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={service.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {service.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{service.description}</div>
        <div className="h-fit mt-6 lg:mt-0">
          <CustomerInfoForm
            pricePerService={service.pricePerService}
            serviceId={service._id}
          />
        </div>
      </div>
    </div>
  )
};

export default Detail;