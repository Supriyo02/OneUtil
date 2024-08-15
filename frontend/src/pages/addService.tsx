import { useMutation } from "react-query";
import ManageServiceForm from "../forms/ManageServiceForm/ManageServiceForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';

const AddService = ()=>{
  const {showToast} = useAppContext();

  const {mutate, isLoading} = useMutation(apiClient.addMyService, {
    onSuccess: ()=>{
      showToast({message: "Service Saved!", type: "SUCCESS"})
    },
    onError: ()=>{
      showToast({message: "Error saving Service", type: "ERROR"});
    },
  });

  const handleSave = (serviceFormData: FormData)=>{
    mutate(serviceFormData);
  };

  return (<ManageServiceForm onSave={handleSave} isLoading={isLoading}/>)
};

export default AddService;