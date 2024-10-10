import React, { useEffect, useState } from "react";
import { Button, Grid, Card, CardContent, Typography, IconButton, CardMedia, Stack } from "@mui/material";
import { useMerchant } from "@/context/MerchantContext";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { capitalizeFirstLetter, formatNaira } from "@/utils/helpers";
import { CartProductModel } from "@/models/product";
import PageContainer from "@/components/container/PageContainer";
import DashboardCard from "@/components/container/DashboardCard";

const CartItemsPage = () => {
  const { itemsCount, setItemsCount, merchant } = useMerchant();
  const [cartProducts, setCartProducts] = useState<CartProductModel[]>([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : null;

    if (cart && cart.products) {
      setCartProducts(cart.products);
    }
  }, []);

  const handleQuantityChange = (productId: string, variationId: string, change: number) => {
    const updatedCartProducts = cartProducts.map((product) => {
      if (product.productId === productId && product.variationId === variationId) {
        const updatedQuantity = product.quantity + change;
        return { ...product, quantity: updatedQuantity > 0 ? updatedQuantity : 1 };
      }
      return product;
    });

    setCartProducts(updatedCartProducts);
    localStorage.setItem("cart", JSON.stringify({ ...merchant, products: updatedCartProducts }));
    setItemsCount(updatedCartProducts.length);
  };

  const handleRemoveProduct = (productId: string, variationId: string) => {
    const updatedCartProducts = cartProducts.filter(
      (product) => !(product.productId === productId && product.variationId === variationId)
    );

    setCartProducts(updatedCartProducts);
    localStorage.setItem("cart", JSON.stringify({ ...merchant, products: updatedCartProducts }));
    setItemsCount(updatedCartProducts.length);
  };

  const totalAmount = cartProducts.reduce((acc, product) => acc + product.amount * product.quantity, 0);

  return (
    <PageContainer title="Shopping Cart" description="Buy online">
        <DashboardCard>
        <div>
            <Typography variant="h3" gutterBottom align="center">
                Your Shopping Cart
            </Typography>
            <br/>
            {cartProducts.length === 0 ? (
                <>
                    <br/>
                    <Typography variant="h6" align="center">Your cart is empty</Typography>
                </>
            ) : (
                <Grid container spacing={3}>
                {cartProducts.map((product) => (
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
            {cartProducts.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "right" }}>
                <Typography variant="h5">Total: {formatNaira(totalAmount)}</Typography>
                <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
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
