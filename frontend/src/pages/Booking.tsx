import {useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailSummary from "../components/BookingDetailSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking =()=>{
  const {stripePromise} = useAppContext();
  const search = useSearchContext();
  const {serviceId} = useParams();

  const {data: paymentIntentData} = useQuery("createPaymentIntent", ()=>
    apiClient.createPaymentIntent(serviceId as string),
    {
      enabled: !!serviceId,
    }
  );

  const {data: service} = useQuery ("fetchServiceById", ()=>
    apiClient.fetchServiceById(serviceId as string),{
      enabled: !!serviceId,
    }
  );

  const {data:currentUser} = useQuery (
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if(!service){
    return <></>;
  }

  return (
  <div className="grid md:grid-cols-[1fr_2fr]">
    <BookingDetailSummary service={service} serviceDate={search.serviceDate} />
    {currentUser && paymentIntentData && (
      <Elements stripe={stripePromise} options={{
        clientSecret: paymentIntentData.clientSecret,
      }}>
        <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
      </Elements>
    )}
  </div>
  );
};

export default Booking;