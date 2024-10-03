import {
    APIResponseModel,
    CreateAccountModel,
    CreatePasswordModel,
    LoginModel, 
} from "@/models/auth";

import { baseUrl } from "@/../env.config";
import { catchActionError } from "@/utils/helpers";
import { getSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

export async function handleLogin(model: LoginModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const response = await fetch(`${baseUrl}/Auth/Login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(model),
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
}

export async function handleRefreshMerchantToken(token: string): Promise<APIResponseModel> {
  return catchActionError(async () => {

    const response = await fetch(`${baseUrl}/Auth/Merchant-Token`, {
      method: "POST",
      headers: { 
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    const data = await response.json();
    return { status: response.ok, data: data };
  });
}

export const handleLogout = () => {
    signOut({
      callbackUrl: "/auth/login"
  });
}

export async function handleSignup(signupDetails: CreateAccountModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const response = await fetch(`${baseUrl}/Auth/Create-Merchant`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(signupDetails),
      });
  
      const data = await response.json();
      return { status: response.ok, data: data };
    });
  }

  export async function handleForgotPassword(email: string): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const response = await fetch(`${baseUrl}/Auth/Forgot-Password`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({email: email}),
      });
  
      const data = await response.json();

      console.log(data)

      return { status: response.ok, data: data };
    });
  }

  export async function handleCreatePassword(model: CreatePasswordModel): Promise<APIResponseModel> {
    return catchActionError(async () => {
      const response = await fetch(`${baseUrl}/Auth/Create-Password`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(model),
      });
  
      const data = await response.json();

      console.log(data)

      return { status: response.ok, data: data };
    });
  }