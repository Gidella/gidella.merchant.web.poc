"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Card, CardContent, IconButton, Stack, Divider } from "@mui/material";
import { useMerchant } from "@/context/MerchantContext";
import { CartProductModel, ProductModel } from "@/models/product";
import { capitalizeFirstLetter, formatNaira } from "@/utils/helpers";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PageContainer from "@/components/container/PageContainer";

const CartItems = () => {
  const { itemsCount, setItemsCount, addProductToCart } = useMerchant();
  const [cartItems, setCartItems] = useState<CartProductModel[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  useEffect(() => {
    // Fetch cart items from local storage on component mount
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItems(parsedCart.products);
      calculateTotal(parsedCart.products);
    }
  }, []);

  const calculateTotal = (items: CartProductModel[]) => {
    const total = items.reduce((sum, item) => {
      const productTotal = item.quantity * item.amount; // Assuming `amount` is stored in cart
      return sum + productTotal;
    }, 0);
    setTotalSum(total);
  };

  const updateQuantity = (productId: string, variationId: string, quantity: number) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.productId === productId && item.variationId === variationId) {
        const updatedItem = { ...item, quantity: item.quantity + quantity };
        return updatedItem;
      }
      return item;
    }).filter(item => item.quantity > 0);

    // Update local storage
    const updatedCart = { ...JSON.parse(localStorage.getItem("cart") as string), products: updatedCartItems };
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update state and recalculate total
    setCartItems(updatedCartItems);
    setItemsCount(updatedCartItems.length);
    calculateTotal(updatedCartItems);
  };

  const removeItem = (productId: string, variationId: string) => {
    const filteredCartItems = cartItems.filter(item => !(item.productId === productId && item.variationId === variationId));

    // Update local storage
    const updatedCart = { ...JSON.parse(localStorage.getItem("cart") as string), products: filteredCartItems };
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update state and recalculate total
    setCartItems(filteredCartItems);
    setItemsCount(filteredCartItems.length);
    calculateTotal(filteredCartItems);
  };

  return (
    <PageContainer title="Cart Items" description="View and manage your cart items">
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      <br />
      <Grid container spacing={3}>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty!</Typography>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="h6">{capitalizeFirstLetter(item.productName)}</Typography>
                        <Typography variant="body2">{item.variationName || "Default"}</Typography>
                      </Stack>
                      <Typography variant="h6">{formatNaira(item.amount * item.quantity)}</Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton onClick={() => updateQuantity(item.productId, item.variationId, -1)}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(item.productId, item.variationId, 1)}>
                          <AddIcon />
                        </IconButton>
                      </Stack>
                      <IconButton onClick={() => removeItem(item.productId, item.variationId)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6">Total: {formatNaira(totalSum)}</Typography>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Checkout
                </Button>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </PageContainer>
  );
};

export default CartItems;
