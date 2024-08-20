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
  const [location, setLocation] = useState<string>(()=>
    sessionStorage.getItem("location") || ""
);
  const [serviceTitle, setServiceTitle] = useState<string>(()=>
    sessionStorage.getItem("serviceTitle") || ""
  );
  const [serviceDate, setServiceDate] = useState<Date>(()=>
    new Date(sessionStorage.getItem("serviceDate") || new Date().toISOString() )
  );
  const [serviceId, setServiceId] = useState<string>(()=>
    sessionStorage.getItem("serviceId") || ""
  );

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

    sessionStorage.setItem("location", location);
    sessionStorage.setItem("serviceTitle", serviceTitle);
    sessionStorage.setItem("serviceDate", serviceDate.toString());

    if(serviceId){
      sessionStorage.setItem("serviceId", serviceId);
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