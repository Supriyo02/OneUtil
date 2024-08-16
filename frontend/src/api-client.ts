import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {ServiceType} from '../../backend/src/shared/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData: SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const body = await response.json();

    if(!response.ok){
        throw new Error(body.message);
    }
    return body;
};

export const validateToken = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials: "include"
    });

    if(!response.ok){
        throw new Error("Token invalid");
    }

    return response.json();
}

export const signOut = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials: "include",
        method: "POST",
    });

    if(!response.ok){
        throw new Error("Error during sign out");
    };
};

export const addMyService = async (serviceFormData: FormData)=>{
    const response = await fetch (`${API_BASE_URL}/api/my-services`, {
        method: "POST",
        credentials: "include",
        body: serviceFormData,
    });

    if(!response.ok){
        throw new Error ("Failed to add service");
    }

    return response.json();
};

export const fetchMyServices = async():Promise<ServiceType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-services`, {
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Error fetching Services");
    }

    return response.json();
};

export const fetchMyServiceById = async(serviceId: string): Promise<ServiceType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-services/${serviceId}`, {
        credentials: "include",
    });
    if(!response.ok){
        throw new Error("Error fetching services");
    }
    return response.json();
};

export const updateMyServiceById= async(serviceFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-services/${serviceFormData.get("serviceId")}`, {
        method: "PUT",
        body: serviceFormData,
        credentials: "include",
    }
    );

    if(!response.ok){
        throw new Error("Failed to update Service");
    }

    return response.json();
};