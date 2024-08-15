import {useFormContext } from "react-hook-form";
import { serviceTypes } from "../../config/service-options-config";
import { ServiceFormData } from "./ManageServiceForm";

const TypeSection = () =>{
  const {register, watch, formState: {errors}} = useFormContext<ServiceFormData>();
  const typeWatch = watch ("type");

  return(
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
        {serviceTypes.map((type)=>(
          <label
          key={type}
          className={
            typeWatch===type? 
            "cursor-pointer bg-red-400 text-sm rounded-md px-3 py-2 font-semibold items-center flex" 
            : "cursor-pointer bg-gray-300 text-sm rounded-md px-3 py-2 font-semibold items-center flex"
          }>
            <input type="radio" value={type} {...register("type",{
              required: "This field is required",
            })}
            className="hidden"
            />
            <span>
              {type}
            </span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-600 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;