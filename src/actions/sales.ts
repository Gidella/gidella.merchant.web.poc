import { APIResponseModel } from "@/models/auth";
import { baseUrl } from "@/../env.config";
import { catchActionError } from "@/utils/helpers";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { CartModel } from "@/models/product";

export async function handleInitiateSales(model: CartModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      const url = `${baseUrl}/Sales/Initialize`;
      
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