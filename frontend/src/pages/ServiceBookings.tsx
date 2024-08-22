import { useQuery } from "react-query";
import * as apiClient from "../api-client";

const ServiceBookings =()=>{
  const {data: services} = useQuery(
    "fetchServiceBookings",
    apiClient.fetchServiceBookings
  );

  if(!services || services.length === 0){
    return <span>No bookings found</span>
  }

  return(
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Service Bookings</h1>
      {services.map((service)=>(
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img 
              src={service.imageUrls[0]} 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {service.name}
              <div className="text-xs font-normal">
                {service.city}, {service.country}
              </div>
            </div>
            {service.bookings.map((booking)=>(
            <div>
              {(new Date(booking.serviceDate).toLocaleDateString() === new Date().toLocaleDateString())&& 
                <div>
                  <span className="font-bold mr-2 text-red-500"> Dates: </span>
                  <span className=" text-red-500">
                    {new Date(booking.serviceDate).toDateString()}
                  </span>
                  <span className=" text-red-500">
                    {" "}for {booking.firstName} {booking.lastName}
                  </span>
                </div>
              }
              {(new Date(booking.serviceDate).toLocaleDateString() > new Date().toLocaleDateString())&& 
                <div>
                  <span className="font-bold mr-2"> Dates: </span>
                  <span>
                    {new Date(booking.serviceDate).toDateString()}
                  </span>
                  <span>
                    {" "}for {booking.firstName} {booking.lastName}
                  </span>
                </div>
              }
              {(new Date(booking.serviceDate).toLocaleDateString() < new Date().toLocaleDateString())&& 
                <div>
                  <span className="font-bold mr-2 text-gray-400"> Dates: </span>
                  <span className="text-gray-400">
                    {new Date(booking.serviceDate).toDateString()}
                  </span>
                  <span className="text-gray-400">
                    {" "}for {booking.firstName} {booking.lastName}
                  </span>
                </div>
              }
            </div>
          ))}
          </div>
        </div>
      ))}
    </div>
  )
};

export default ServiceBookings;