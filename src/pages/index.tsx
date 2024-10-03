"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "./loading";

const Home = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // If the user is logged in, redirect them to /dashboard or to where they can create merchant account
    if (session) {
      const { user } = session;
      if (user.role == 1 || user.role == 2){
        router.push('/dashboard/admin');
      }else if (user.role == 3){
        router.push('/dashboard/merchant');
      }else if(user.role == 4){
        router.push('/merchants/create')
      }
    }
  }, [session, router]);


  if (session) { 
    return (
            <>
              <Loading></Loading>
            </>
        );
    }
};
Home.displayName = '/index'
export default Home;