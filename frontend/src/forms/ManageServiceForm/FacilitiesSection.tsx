import { useFormContext } from "react-hook-form";
import { serviceFacilities } from "../../config/service-options-config";
import { ServiceFormData } from "./ManageServiceForm";

const FacilitisSection = () =>{
  const {register, formState: {errors}} = useFormContext<ServiceFormData>();

  return(
    <div>
      <h2 className="text-2xl font-bol mb-3">
        Facilities
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
       {serviceFacilities.map((facility)=>(
        <label className="text-sm flex gap-1 text-gray-700 items-center" key={facility}>
          <input type="checkbox" value={facility} {...register("facilities",{
            validate: (facilities)=>{
              if(facilities && facilities.length>0){
                return true;
              } else{
                return "At least one facility is required";
              }
            },
          })}/>
          {facility}
        </label>
       ))} 
      </div>
      {errors.facilities && (
        <span className="text-red-600 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  )
};

export default FacilitisSection;