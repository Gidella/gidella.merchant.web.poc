import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Button,
  Skeleton
} from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "@/components/cards/BlankCard";
import DashboardCard from "@/components/container/DashboardCard";
import PageContainer from "@/components/container/PageContainer";
import { useEffect, useState } from "react";
import { ProductModel } from "@/models/product";
import { handleGetProducts } from "@/actions/product";
import { capitalizeFirstLetter, formatNaira } from "@/utils/helpers";
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true)
      const res = await handleGetProducts(null);
      if (res.status) {
        setProducts(res.data.data); 
        setLoadingProducts(false)
      } else {
        console.error("Failed to fetch products");
        setLoadingProducts(false)
      }
    };

    fetchProducts();
  }, []);

  return (
    <PageContainer title="Products" description="Add your product on Gidella">
      <DashboardCard
        title="Products"
        action={
          <Button
            color="primary"
            component={Link}
            href="/products/add"
            variant="contained"
            size="medium"
          >
            Add Product
          </Button>
        }
      >
        <Grid container spacing={3}>
          <br />
          {loadingProducts ? (
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
          ) : products.length === 0 ? (
            // Display this block when there are no products
            <Grid item xs={12}>
              <BlankCard sx={{ textAlign: "center", p: 5 }}>
                <Typography variant="h6">No products available</Typography>
                <Typography variant="body1">
                  Add products to your store to get started!
                </Typography>
                <Button
                  color="primary"
                  component={Link}
                  href="/products/add"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Add Product
                </Button>
              </BlankCard>
            </Grid>
          ) : (
            // Display products
            products.map((product, index) => (
              <Grid item xs={12} md={4} lg={3} key={index}>
                <BlankCard sx={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
                  <Typography component={Link} href="/">
                    <Image 
                      src={product.mediaURLs[0]} 
                      width={300} 
                      height={200} 
                      alt="Image Preview" style={{ width: '100%', objectFit: 'contain' }} />
                  </Typography>
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

export default Products;