import { ServiceType } from "../../../backend/src/shared/types"

type Props={
  serviceDate: Date,
  service: ServiceType;
};

const BookingDetailSummary =({serviceDate, service}:Props)=>{

  return(
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
    <h2 className="text-xl font-bold">Your Booking Details</h2>
    <div className="border-b py-2">
      Service:
      <div className="font-bold">{` ${service.name}`}</div>
    </div>
    <div className="border-b py-2">
      Location:
      <div className="font-bold">{` ${service.city}, ${service.country}`}</div>
    </div>

    <div>
      Date:
      <div className="font-bold"> {serviceDate.toDateString()}</div>
    </div>
  </div>
  )
};

export default BookingDetailSummary;