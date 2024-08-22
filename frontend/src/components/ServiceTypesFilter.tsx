import { useMediaQuery } from "react-responsive";
import { serviceTypes } from "../config/service-options-config";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  selectedServiceTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
};

const ServiceTypesFilter = ({selectedServiceTypes, onChange}: Props)=>{
  const isMediumOrLargeScreen = useMediaQuery({ minWidth: 1000 });
  const [isOpen, setIsOpen]=useState(isMediumOrLargeScreen);

  return(
    <div className="border-b border-slate-300 pb-5">
      <button 
      onClick={() => setIsOpen(!isOpen)}
      className=" mb-2 flex justify-between items-center w-full">
        <span className="text-md font-semibold">Service Type</span>
        {isOpen?<FaChevronUp/>:<FaChevronDown />}
      </button>
      {isOpen && serviceTypes.map((serviceType)=>(
        <label className="flex items-center space-x-2" >
          <input 
          type="checkbox"
          className="rounded"
          value={serviceType}
          checked={selectedServiceTypes.includes(serviceType)}
          onChange={onChange} 
          />
          <span>{serviceType}</span>
        </label>
      ))}
    </div>
  )
}

export default ServiceTypesFilter;