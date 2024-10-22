"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useMerchant } from "@/context/MerchantContext";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { handleInitiateSales } from "@/actions/sales";
import { CartModel } from "@/models/product";

const PaymentOptionPage = () => {
  const router = useRouter();
  const [paymentOption, setPaymentOption] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { data: session } = useSession();
  const { updateCartPayment } = useMerchant();
  const { itemsCount } = useMerchant();

  const handlePaymentSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentOption(e.target.value);
  };


  useEffect(() => {
    if (itemsCount === 0) {
      router.push("/");
    }

    if (session){
      setIsLoggedIn(true)   
    }else{
      setIsLoggedIn(false)
    }
  }, [itemsCount, router]);

  const handleCheckOut = async () => {
    if (paymentOption === "installments") {
      updateCartPayment(2)
    } else if (paymentOption === "paystack") {
      updateCartPayment(1)
    } else if (paymentOption === "monnify") {
      updateCartPayment(3)
    } else {
      alert("Kindly select payment option to continue.");
      return
    }

    if(isLoggedIn){
      const cart: CartModel | null = localStorage.getItem('cart') 
      ? (JSON.parse(localStorage.getItem('cart')!) as CartModel) 
      : null;
    
      if(!cart){
        router.push('/cart-items');
        return;
      } 

      await router.push('/order-summary');
    }else{
      await router.push("/login");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Choose Payment Option
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Select how you would like to make payment
        </Typography>
      </Box>

      <FormControl component="fieldset" sx={{ width: "100%" }}>
        <FormLabel component="legend">Payment Options</FormLabel>
        <RadioGroup
          aria-label="payment-options"
          name="payment-options"
          value={paymentOption}
          onChange={handlePaymentSelection}
        >
          <FormControlLabel
            value="installments"
            control={<Radio />}
            label="Pay in Installments"
          />
          <FormControlLabel
            value="monnify"
            control={<Radio />}
            label="Pay with Monnify"
          />
          <FormControlLabel
            value="paystack"
            control={<Radio />}
            label="Pay with Paystack"
          />
        </RadioGroup>
      </FormControl>

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "50%" }}
          onClick={handleCheckOut}
        >
          Proceed
        </Button>
      </Stack>
    </Container>
  );
};

export default PaymentOptionPage;
