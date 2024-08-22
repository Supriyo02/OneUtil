import { AiFillStar } from "react-icons/ai";
import { ServiceType } from "../../../backend/src/shared/types"
import { Link } from "react-router-dom";

type Props = {
  service: ServiceType;
};

const SearchResultsCard = ({service}: Props) =>{
  return(
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-4 md:p-8 gap-8">
      <div className="w-full h-[300px]">
        <img src={service.imageUrls[0]} className="w-full h-full object-cover object-center" />
      </div>
      <div className="grid grid-rows-[1fr_1fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({length: service.starRating }).map(()=>(
                <AiFillStar className="fill-black" />
              ))}
            </span>
            <span className="ml-1 text-sm">
              {service.type}
            </span>
          </div>
          <Link to={`/detail/${service._id}`} className="text-2xl font-bold cursor-pointer">
            {service.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">
              {service.description}
            </div>
        </div>

        <div className="grid md:grid-cols-2 items-end whitespace-nowrap space-y-4 md:space-y-0">
              <div className="flex gap-1 items-center">
                {service.facilities.slice(0,2).map((facility)=>(
                  <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                    {facility}
                  </span>
                ))}
                <span className="text-sm">
                  {service.facilities.length > 2 && `+${service.facilities.length -2} more`}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-bold">₹{service.pricePerService}</span>
                <Link to={`/detail/${service._id}`} className="bg-gray-900 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-gray-700">View More</Link>
              </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;