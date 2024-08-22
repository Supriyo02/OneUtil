import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
};

const starRatingFilter = ({selectedStars, onChange}: Props)=>{
  const isMediumOrLargeScreen = useMediaQuery({ minWidth: 1000 });
  const [isOpen, setIsOpen]=useState(isMediumOrLargeScreen);

  return(
    <div className="border-b border-slate-300 pb-5">
      <button className="mb-2 flex justify-between items-center w-full" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-md font-semibold">Service Rating</span>
        {isOpen?<FaChevronUp/>:<FaChevronDown />}
      </button>
      {isOpen && (
        ["5","4","3","2","1"].map((star)=>(
          <label className="flex items-center space-x-2" >
            <input 
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange} 
            />
            <span>{star} Stars</span>
          </label>
        ))
      )}
    </div>
  )
}

export default starRatingFilter;