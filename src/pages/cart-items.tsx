import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Stack,
  Skeleton,
} from "@mui/material";
import { useMerchant } from "@/context/MerchantContext";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { capitalizeFirstLetter, formatNaira } from "@/utils/helpers";
import { CartModel } from "@/models/product";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/container/DashboardCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { enqueueSnackbar } from "notistack";

const CartItemsPage = () => {
  const { itemsCount, setItemsCount, merchant } = useMerchant();
  const [cartData, setCartProducts] = useState<CartModel>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      const cart = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart") as string)
        : null;

      if (cart && cart.products) {
        setCartProducts(cart);
      }
      setLoading(false);
    }, 500); 
  }, []);

  const handleQuantityChange = (productId: string, variationId: string | null, change: number) => {
    
    const updatedCartProducts = cartData?.products.map((product) => {
      if (product.productId === productId && product.variationId === variationId) {
        const updatedQuantity = product.quantity + change;
        return { ...product, quantity: updatedQuantity > 0 ? updatedQuantity : 1 };
      }
      return product;
    });
    const cart: CartModel = {
      merchantId: cartData?.merchantId || "",
      paymentMode: cartData?.paymentMode || 0,
      products: updatedCartProducts || []
    }
    setCartProducts(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setItemsCount(cart.products.length);
  };

  const handleRemoveProduct = (productId: string, variationId: string | null) => {
    const updatedCartProducts = cartData?.products.filter(
      (product) => !(product.productId === productId && product.variationId === variationId)
    );

    const cart: CartModel = {
      merchantId: cartData?.merchantId || "",
      paymentMode: cartData?.paymentMode || 0,
      products: updatedCartProducts || []
    }
    setCartProducts(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    setItemsCount(cart.products.length);
  };

  const totalAmount = cartData?.products.reduce((acc, product) => acc + product.amount * product.quantity, 0) || 0;

  return (
    <PageContainer title="Shopping Cart" description="Buy online">
      <DashboardCard>
        <div>
          <Typography variant="h3" gutterBottom align="center">
            Your Shopping Cart
          </Typography>
          <br />
          {loading ? (
            <Grid container spacing={3}>
              {Array.from(new Array(4)).map((_, index) => (
                <Grid item xs={12} md={4} lg={3} key={index}>
                  <Card>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent>
                      <Skeleton variant="text" height={30} />
                      <Skeleton variant="text" height={20} />
                      <Skeleton variant="text" height={40} />
                      <Skeleton variant="rectangular" height={50} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : cartData?.products.length === 0 ? (
            <>
              <br />
              <Typography variant="h6" align="center">
                Your cart is empty
              </Typography>
              <Stack direction="row" justifyContent="center" mt={2}>
                <Button variant="contained" component={Link} href="/" color="primary">
                  Continue Shopping
                </Button>
              </Stack>
            </>
          ) : (
            <Grid container spacing={3}>
              {cartData?.products.map((product) => (
                <Grid item xs={12} md={4} lg={3} key={product.productId + product.variationId}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.imageUrl}
                      alt={product.productName}
                      sx={{ objectFit: "contain", p: 2 }}
                    />
                    <CardContent>
                      <Typography variant="h6">{capitalizeFirstLetter(product.productName)}</Typography>
                      {product.variationName && (
                        <Typography variant="subtitle2">Variation: {product.variationName}</Typography>
                      )}
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">{formatNaira(product.amount * product.quantity)}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <IconButton
                            onClick={() => handleQuantityChange(product.productId, product.variationId, -1)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{product.quantity}</Typography>
                          <IconButton
                            onClick={() => handleQuantityChange(product.productId, product.variationId, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Stack>
                      </Stack>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleRemoveProduct(product.productId, product.variationId)}
                        sx={{ mt: 2 }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {cartData?.products !== undefined && cartData?.products.length > 0  && (
            <div className="cart-container">
              <br />
              <Typography variant="h5">Total: {formatNaira(totalAmount)}</Typography>

              <Button variant="contained" component={Link} href="/payment-options" color="primary" size="large" sx={{ mt: 2 }}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default CartItemsPage;
