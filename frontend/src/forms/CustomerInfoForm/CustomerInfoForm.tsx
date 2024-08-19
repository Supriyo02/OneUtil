import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  serviceId: string;
  pricePerService: number;
};

type CustomerInfoFormData = {
  serviceDate: Date,
};

const CustomerInfoForm = ({ serviceId, pricePerService }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    handleSubmit,
    setValue,
  } = useForm<CustomerInfoFormData>({
    defaultValues: {
      serviceDate: search.serviceDate,
    },
  });

  const serviceDate = watch("serviceDate");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: CustomerInfoFormData) => {
    search.saveSearchValues(
      "",
      "",
      data.serviceDate,
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: CustomerInfoFormData) => {
    search.saveSearchValues(
      "",
      "",
      data.serviceDate,
    );
    navigate(`/service/${serviceId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-black gap-4">
      <h3 className="text-md font-bold text-white">₹{pricePerService}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={serviceDate}
              onChange={(date) => setValue("serviceDate", date as Date)}
              selectsStart
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Service Date"
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
        
          {isLoggedIn ? (
            <button className="bg-red-600 text-white h-full p-2 font-bold hover:bg-red-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-red-600 text-white h-full p-2 font-bold hover:bg-red-500 text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;