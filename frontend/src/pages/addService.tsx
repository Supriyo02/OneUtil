import { useMutation } from "react-query";
import ManageServiceForm from "../forms/ManageServiceForm/ManageServiceForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';
import { useNavigate } from "react-router-dom";

const AddService = ()=>{
  const {showToast} = useAppContext();
  const navigate = useNavigate();

  const {mutate, isLoading} = useMutation(apiClient.addMyService, {
    onSuccess: ()=>{
      showToast({message: "Service Saved!", type: "SUCCESS"})
      navigate("/my-services");
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