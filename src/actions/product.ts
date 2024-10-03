import { APIResponseModel } from "@/models/auth";
import { baseUrl } from "@/../env.config";
import { catchActionError } from "@/utils/helpers";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { CreateProductModel } from "@/models/product";


export async function handleGetProductCategories(merchantId: (string | null)): Promise<APIResponseModel> {
  return catchActionError(async () => {
    const session = await getSession();

    const token = (session as Session)?.token as string;
    const url = merchantId !== null ? `${baseUrl}/ProductCategory?merchantId=${merchantId}` : `${baseUrl}/ProductCategory`;
    
    const response = await fetch(url, {
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

export async function handleGetProductBrand(merchantId: (string | null)): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      const url = merchantId !== null ? `${baseUrl}/ProductBrand?merchantId=${merchantId}` : `${baseUrl}/ProductBrand`;
      
      const response = await fetch(url, {
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

export async function handleCreateProduct(model: CreateProductModel, merchantId: (string | null)): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      const url = merchantId !== null ? `${baseUrl}/Product/Create?merchantId=${merchantId}` : `${baseUrl}/Product/Create`;
      
      const response = await fetch(url, {
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


  export async function handleGetProducts(merchantId: (string | null)): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      const url = merchantId !== null ? `${baseUrl}/Product/Get?merchantId=${merchantId}` : `${baseUrl}/Product/Get`;
      
      const response = await fetch(url, {
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
