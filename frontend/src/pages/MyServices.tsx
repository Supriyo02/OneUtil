import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from '../api-client';
import {BiMoney, BiStar} from 'react-icons/bi';
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";


const MyServices= ()=>{
  const {data: serviceData} = useQuery ("fetchMyServices", apiClient.fetchMyServices, {
    onError: ()=>{

    },
  });

  if(!serviceData){
    return <span>No Services found</span>;
  }

  return (
  <div className="space-y-5">
    <span className="flex justify-between">
      <h1 className="text-3xl font-bold">My Services</h1>
      <Link to="/add-service" className="flex bg-red-500 text-white text-xl font-bold p-2 hover:bg-red-400">Add Service</Link>
    </span>

    <div className="grid grid-cols-1 gap-8">
      {serviceData?.map((service)=>(
        <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <div className="whitespace-pre-line">{service.description}</div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <FaMapMarkedAlt className="mr-1 w-1/6" />
              <span className="w-5/6">{service.city}, {service.country}</span>
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center space-x-1">
              <FaUserGear className="mr-1 w-1/6" />
              <span className="w-5/6">{service.type}</span>
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <BiMoney className="mr-1 w-1/6" />
              <span className="w-5/6">₹{service.pricePerService} per service</span>
            </div>
            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
              <BiStar className="mr-1 w-1/6" />
              <span className="w-5/6">{service.starRating} Star Rating</span>
            </div>
          </div>

          <span className="flex justify-end">
            <Link
            className="flex bg-red-500 text-white text-xl font-bold p-2 hover:bg-red-400"
            to={`/edit-service/${service._id}`}>
              View Details
            </Link>
          </span>
        </div>
      ))}
    </div>
  </div>
  );
};

export default MyServices;