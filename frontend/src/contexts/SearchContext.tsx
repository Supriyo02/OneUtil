import React, { useContext, useState } from "react";

type SearchContext = {
  serviceTitle: string;
  location: string;
  serviceDate: Date;
  serviceId: string;
  saveSearchValues: (
    serviceTitle: string,
    location: string,
    serviceDate: Date,
    serviceId?: string
  ) => void;
};

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const [location, setLocation] = useState<string>("");
  const [serviceTitle, setServiceTitle] = useState<string>("");
  const [serviceDate, setServiceDate] = useState<Date>(new Date());
  const [serviceId, setServiceId] = useState<string>("");

  const saveSearchValues = (
    serviceTitle: string,
    location: string,
    serviceDate: Date,
    serviceId?: string
  ) => {
    setLocation(location);
    setServiceTitle(serviceTitle);
    setServiceDate(serviceDate);
    if(serviceId){
      setServiceId(serviceId);
    }
  };

  return <SearchContext.Provider value={{
    serviceTitle,
    location,
    serviceDate,
    serviceId,
    saveSearchValues,
  }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = ()=>{
  const context= useContext(SearchContext);
  return context as SearchContext;
}