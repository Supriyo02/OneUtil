import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import ServiceTypesFilter from "../components/ServiceTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const isMediumOrLargeScreen = useMediaQuery({ minWidth: 1000 });
  const [isOpen, setIsOpen]=useState(isMediumOrLargeScreen);

  const searchParams = {
    serviceTitle: search.serviceTitle,
    location: search.location,
    serviceDate: search.serviceDate.toISOString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedServiceTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: serviceData } = useQuery(["searchServices", searchParams], () =>
    apiClient.searchServices(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleServiceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const serviceType = event.target.value;

    setSelectedServiceTypes((prevServiceTypes) =>
      event.target.checked
        ? [...prevServiceTypes, serviceType]
        : prevServiceTypes.filter((serviceType1) => serviceType1 !== serviceType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <button
          onClick={()=>setIsOpen(!isOpen)}
           className="items-center w-full border-b border-slate-300 pb-5 flex justify-between">
            <span className="text-lg font-semibold">Filter By: </span>
            {isOpen?<FaChevronUp/>:<FaChevronDown />}
          </button>

          {isOpen &&(
            <div className="space-y-5">
            <StarRatingFilter 
            selectedStars={selectedStars} 
            onChange={handleStarsChange} 
            />

            <ServiceTypesFilter 
            selectedServiceTypes={selectedServiceTypes} 
            onChange={handleServiceTypeChange} 
            />

            <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange} 
            />

            <PriceFilter 
            selectedPrice={selectedPrice} 
            onChange={(value?:number)=>setSelectedPrice(value)} 
            />
          </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {serviceData?.pagination.total} Services found
            {search.location ? ` in ${search.location}` : ""}
          </span>
          
          <select 
          value={sortOption}
          onChange={(event)=>setSortOption(event.target.value)}
          className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerServiceAsc">Price (low to high)</option>
            <option value="pricePerServiceDesc">Price (high to low)</option>
          </select>

        </div>
        {serviceData?.data.map((service) => (
          <SearchResultsCard service={service} />
        ))}

        <div>
          <Pagination
            page={serviceData?.pagination.page || 1}
            pages={serviceData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
