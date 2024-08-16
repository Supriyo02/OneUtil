import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitisSection from "./FacilitiesSection";
import ImagesSection from "./ImagesSection";
import { ServiceType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type ServiceFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerService: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
};

type Props = {
  service?: ServiceType;
  onSave: (serviceFormData: FormData) => void;
  isLoading: boolean;
};

const ManageServiceForm = ({ onSave, isLoading, service }: Props) => {
  const formMethods = useForm<ServiceFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect (() => {
    reset(service);
  }, [service, reset]);

  const onSubmit = handleSubmit((formDataJson: ServiceFormData) => {
    const formData = new FormData();
    if(service){
      formData.append("serviceId", service._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append(
      "pricePerService",
      formDataJson.pricePerService.toString()
    );
    formData.append("starRating", formDataJson.starRating.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url, index)=>{
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitisSection />
        <ImagesSection />

        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-red-500 text-white p-2 font-bold hover:bg-red-400 text-xl rounded-md disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageServiceForm;
