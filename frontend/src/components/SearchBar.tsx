import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar =()=>{
  const search = useSearchContext();
  const navigate = useNavigate();
  
  const [location, setLocation]=useState<string>(search.location);
  const [serviceTitle, setServiceTitle] = useState<string>(search.serviceTitle);
  const [serviceDate, setServiceDate] = useState<Date>(search.serviceDate);

  const handleSubmit = (event:FormEvent)=>{
    event.preventDefault();
    search.saveSearchValues(
      serviceTitle.trim(),
      location.trim(),
      serviceDate
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() +1);

  return(
    <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-red-500 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <FiSearch size={25} className="mr-2"/>
        <input placeholder="Search services" className="text-md w-full focus:outline-none"
        value={serviceTitle}
        onChange={(event)=> setServiceTitle(event.target.value)}
        />
      </div>

      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2"/>
        <input placeholder="Location" className="text-md w-full focus:outline-none"
        value={location}
        onChange={(event)=> setLocation(event.target.value)}
        />
      </div>

      <div>
        <DatePicker 
        selected={serviceDate} 
        onChange={(date)=>setServiceDate(date as Date)} 
        minDate={minDate}
        maxDate={maxDate}
        placeholderText="Service Date"
        className="min-w-full mobile:max-w-10 bg-white p-2 focus:outline-none"
        wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-7/12 md:w-2/3 bg-gray-800 text-white h-full p-2 font-bold text-xl hover:bg-gray-700">
          Search
        </button>
        <button className="w-5/12 md:w-1/3 bg-red-700 text-white h-full p-2 font-bold text-xl hover:bg-red-600">
          Clear
        </button>
      </div>
    </form>
  )
}

export default SearchBar;