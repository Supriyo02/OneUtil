import { useMediaQuery } from "react-responsive";
import { serviceFacilities } from "../config/service-options-config";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
};

const FacilitiesFilter = ({selectedFacilities, onChange}: Props)=>{
  const isMediumOrLargeScreen = useMediaQuery({ minWidth: 1000 });
  const [isOpen, setIsOpen]=useState(isMediumOrLargeScreen);

  return(
    <div className="border-b border-slate-300 pb-5">
      <button 
      onClick={() => setIsOpen(!isOpen)}
      className="mb-2 flex justify-between items-center w-full">
        <span className="text-md font-semibold">Facilities</span>
        {isOpen?<FaChevronUp/>:<FaChevronDown />}
      </button>
      {isOpen && serviceFacilities.map((facility)=>(
        <label className="flex items-center space-x-2" >
          <input 
          type="checkbox"
          className="rounded"
          value={facility}
          checked={selectedFacilities.includes(facility)}
          onChange={onChange} 
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  )
}

export default FacilitiesFilter;