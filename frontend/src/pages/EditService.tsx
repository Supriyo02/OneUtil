import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import ManageServiceForm from "../forms/ManageServiceForm/ManageServiceForm";
import { useAppContext } from "../contexts/AppContext";

const EditService = ()=>{
  const {serviceId} = useParams();
  const {showToast} = useAppContext();

  const {data:service} = useQuery("fetchMyServiceById", ()=> 
    apiClient.fetchMyServiceById(serviceId || ''), {
      enabled: !!serviceId,
    }
);

const {mutate, isLoading} = useMutation(apiClient.updateMyServiceById, {
  onSuccess: ()=>{
    showToast({message: "Service Saved!", type: "SUCCESS"});
  },
  onError: ()=>{
    showToast({message: "Error!", type: "ERROR"});
  }
});

const handleSave = (serviceFormData: FormData) =>{
  mutate(serviceFormData);
};

return (
    <ManageServiceForm service={service} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditService;