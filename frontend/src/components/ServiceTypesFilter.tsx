import { serviceTypes } from "../config/service-options-config";

type Props = {
  selectedServiceTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
};

const ServiceTypesFilter = ({selectedServiceTypes, onChange}: Props)=>{
  return(
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Service Type</h4>
      {serviceTypes.map((serviceType)=>(
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