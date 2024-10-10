"use client";

import React, { useEffect, useState } from "react";
import router from "next/router";
import { CardContent, Typography, Grid, Tooltip, Fab, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "@/components/cards/BlankCard";
import Link from "next/link";
import DashboardCard from "@/components/container/DashboardCard";
import { handleGetMerchantData } from "@/actions/merchant";
import { MerchantModel } from "@/models/merchant";
import { capitalizeFirstLetter, formatNaira, retrieveOrSetSubdomain } from "@/utils/helpers";
import PageContainer from "@/components/container/PageContainer";
import Image from "next/image";
import { useMerchant } from "@/context/MerchantContext";


export const getServerSideProps = async (context: any) => {
  const { req, res } = context;

  const subdomain = retrieveOrSetSubdomain(req, res);

  return {
    props: {
      subdomain,
    },
  };
};

const Home = ({ subdomain }: { subdomain: string | null }) => {
  const { addProductToCart } = useMerchant();

  const [merchantDetails, setMerchantDetails] = useState<MerchantModel>();
  const [loadingMerchantDetails, setLoadingMerchantDetails] = useState(true);
  const { setMerchant, loading } = useMerchant();

  useEffect(() => {
    const fetchProducts = async (subdomain: string) => {
      setLoadingMerchantDetails(true)
      const res = await handleGetMerchantData(subdomain);
      console.log(res)
      if(!res.status){
        setLoadingMerchantDetails(false)
        router.push('/business-not-found');
      }
      if (res.data.status && res.status) {
        setMerchantDetails(res.data.data); 
        setMerchant(res.data.data);
        setLoadingMerchantDetails(false)
      } else {
        setLoadingMerchantDetails(false)
        router.push('/business-not-found');
      }
    };

    if(subdomain){
      fetchProducts(subdomain);
    }
  }, [subdomain]);

  return (
    <PageContainer title="Products" description="Add your product on Gidella">
      <DashboardCard>
        <Grid container spacing={3}>
          <br />
          {loadingMerchantDetails ? (
            // Loading skeletons
            Array.from(new Array(8)).map((_, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <BlankCard sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                  <Skeleton variant="rectangular" width="100%" height={140} />
                  <CardContent sx={{ p: 3, pt: 2 }}>
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </CardContent>
                </BlankCard>
              </Grid>
            ))
          ) : merchantDetails?.products.length === 0 ? (
            // Display this block when there are no products
            <Grid item xs={12}>
              <BlankCard sx={{ textAlign: "center", p: 5 }}>
                <Typography variant="h6">No products available at the moment</Typography>
                <Typography variant="body1">
                  Check back later!
                </Typography>                
              </BlankCard>
            </Grid>
          ) : (
            // Display products
            merchantDetails?.products.map((product, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <BlankCard sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                  <Typography component={Link} href="/">
                    <Image 
                      src={product.mediaURLs[0]} 
                      width={300} 
                      height={200} 
                      alt="Image Preview" style={{ width: '100%', objectFit: 'contain' }} />
                  </Typography>
                  <Tooltip title="Add To Cart">
                    <Fab
                      size="small"
                      color="primary"
                      sx={{ bottom: "75px", right: "15px", position: "absolute" }}
                      onClick={() => addProductToCart(product)}
                    >
                      <IconBasket size="16" />
                    </Fab>
                  </Tooltip>
                  <CardContent sx={{ p: 3, pt: 2 }}>
                    <Typography variant="h6">
                      {capitalizeFirstLetter(product.name)}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={1}
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h6">
                          {formatNaira(product.amount)}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </BlankCard>
              </Grid>
            ))
          )}
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
};
Home.displayName = '/index'
export default Home;