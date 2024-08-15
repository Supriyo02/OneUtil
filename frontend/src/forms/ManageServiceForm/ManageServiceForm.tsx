import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitisSection from "./FacilitiesSection";
import ImagesSection from "./ImagesSection";

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
};

type Props = {
  onSave: (serviceFormData: FormData) => void;
  isLoading: boolean;
};

const ManageServiceForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<ServiceFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: ServiceFormData) => {
    const formData = new FormData();
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append(
      "pricePerService",
      formDataJson.pricePerService.toLocaleString()
    );
    formData.append("starRating", formDataJson.starRating.toLocaleString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

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
