import { APIResponseModel } from "@/models/auth";

import { baseUrl } from "@/../env.config";
import { catchActionError } from "@/utils/helpers";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { AdminCreateMerchantModel, CreateMerchantModel } from "@/models/merchant";

export async function handleGetMerchants(page: number): Promise<APIResponseModel> {
  return catchActionError(async () => {
    const session = await getSession();
    const token = (session as Session)?.token as string;

    const response = await fetch(`${baseUrl}/Merchant/Get?page=${page}`, {
      method: "GET",
      headers: { 
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();
    return { status: response.ok, data: data };
  });
}

export async function handleGetMerchantCategories(): Promise<APIResponseModel> {
  return catchActionError(async () => {
    const session = await getSession();

    const token = (session as Session)?.token as string;
    
    const response = await fetch(`${baseUrl}/Merchant/Categories`, {
      method: "GET",
      headers: { 
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });

    const data = await response.json();
    return { status: response.ok, data: data };
  });
}

export async function handleGetCountries(): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      
      const response = await fetch(`${baseUrl}/Country`, {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
  }

export async function handleCreateMerchantBusiness(model: CreateMerchantModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      
      const response = await fetch(`${baseUrl}/Merchant/Create-Business`, {
        method: "POST",
        headers: { 
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(model),
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
  }

  export async function handleAdminCreateMerchantBusiness(model: AdminCreateMerchantModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      
      const response = await fetch(`${baseUrl}/Auth/Admin/Create-Merchant`, {
        method: "POST",
        headers: { 
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(model),
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
  }

