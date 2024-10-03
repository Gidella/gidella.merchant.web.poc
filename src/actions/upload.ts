import { APIResponseModel } from "@/models/auth";
import { catchActionError } from "@/utils/helpers";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { baseUrl } from "@/../env.config";

export async function handleImageUpload(image: FormData): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const session = await getSession();
  
      const token = (session as Session)?.token as string;
      
      const response = await fetch(`${baseUrl}/Upload/Images`, {
        method: "POST",
        headers: { 
          "accept": "text/plain",
          Authorization: `Bearer ${token}`,
        },
        body: image
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
  }