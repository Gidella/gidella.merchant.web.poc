import { APIResponseModel } from "@/models/auth";

import { baseUrl } from "@/../env.config";
import { catchActionError } from "@/utils/helpers";
import { getSession } from "next-auth/react";


export async function handleGetDashboardData(): Promise<APIResponseModel> {
  return catchActionError(async () => {
    const session = await getSession();
    
    const response = await fetch(`${baseUrl}/Dashboard/Data`, {
      method: "GET",
      headers: { "Content-type": "application/json" }
    });

    const data = await response.json();
    return { status: response.ok, data: data };
  });
}

