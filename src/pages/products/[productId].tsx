"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMerchant } from "@/context/MerchantContext"; // Assuming useMerchant fetches async data
import { ProductModel } from "@/models/product";
import { Grid, Typography, Button, IconButton, Box, Divider, Stack, Skeleton } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import { capitalizeFirstLetter, formatNaira } from "@/utils/helpers";

const ProductDetails = () => {
  const { merchant, addProductToCart } = useMerchant();
  const [product, setProduct] = useState<ProductModel | null>(null);
  const [merchantLoaded, setMerchantLoaded] = useState(false); // Track when merchant data is fully loaded
  const router = useRouter();
  const { productId } = router.query;


  useEffect(() => {
    const fromIndex = sessionStorage.getItem("fromIndex");
    
    if(productId){
        if (fromIndex != productId) {
            router.push("/")
        }
    }

    if (merchant) {
      const foundProduct = merchant?.products.find(
        (prod) => prod.productId === productId
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else if (merchantLoaded) {
        router.push("/404");
      }
    }

    if (merchant) {
      setMerchantLoaded(true);
    }

    }, [merchant, productId, router, merchantLoaded]);

    if (!merchantLoaded) {
        return (
        <Box sx={{ padding: "2rem" }}>
            <Skeleton variant="rectangular" width="100%" height={400} sx={{ mt: 2, borderRadius: "8px" }} />
        </Box>
        );
    }

    if (!product) {
        return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h5">Product not found.</Typography>
        </Box>
        );
    }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Back Button */}
      <IconButton onClick={() => router.back()} aria-label="go back" sx={{ mb: 2 }}>
        <IconArrowLeft size={24} />
        <Typography variant="button" sx={{ ml: 1 }}>
          Back to Products
        </Typography>
      </IconButton>

      {/* Product Details Layout */}
      <Grid container spacing={5}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Image
            src={product.mediaURLs[0]}
            width={400}
            height={400}
            alt={product.name}
            style={{ width: "100%", objectFit: "contain", borderRadius: "8px" }}
          />
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {capitalizeFirstLetter(product.name)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" sx={{ mb: 2 }}>
            {formatNaira(product.amount)}
          </Typography>

          <Typography variant="body1" color="textSecondary" paragraph>
            {product.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Add to Cart Button */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="contained" color="primary" size="large" onClick={() => addProductToCart(product)}>
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
