import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  CircularProgress, 
} from "@mui/material";
import { useMerchant } from "@/context/MerchantContext";
import { formatNaira, capitalizeFirstLetter } from "@/utils/helpers";
import { useSession } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { handleInitiateSales } from "@/actions/sales";
import { CartModel } from "@/models/product";

const OrderSummaryPage = () => {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartModel | null>(null);
  const [loading, setLoading] = useState(true); 
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session, status } = useSession(); 
  const { itemsCount, setItemsCount } = useMerchant();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (itemsCount === 0) {
      router.push("/");
      return;
    }

    const cart: CartModel | null = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart") as string)
      : null;

    if (cart) {
      setCartData(cart);
    }

    setLoading(false); 
  }, [itemsCount, router, session, status]);

  const paymentOptionLabel = () => {
    switch (cartData?.paymentMode) {
      case 1:
        return "Pay with Paystack";
      case 2:
        return "Pay in Installments";
      case 3:
        return "Pay with Monnify";
      default:
        return "No payment option selected";
    }
  };

  const handleProceed = async () => {
    if (!cartData) {
      router.push("/");
      return;
    }

    setIsProcessing(true); // Start processing
    const result = await handleInitiateSales(cartData);

    if (result.status && result.data.status) {
      localStorage.removeItem("cart");
      setItemsCount(0);
      enqueueSnackbar("Order initiated successfully! You'll be redirected to our payment partner.", {
        variant: "success",
        autoHideDuration: 1500,
      });
      setTimeout(() => {
        window.location.href = result.data.data;
      }, 1500);
    } else {
      enqueueSnackbar(result.data.message, {
        variant: "error",
        autoHideDuration: 1500,
      });
      router.push("/order-summary");
    }

    setIsProcessing(false); 
  };

  const totalAmount = cartData?.products.reduce(
    (acc, product) => acc + product.amount * product.quantity,
    0
  );

  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.1)",
          boxShadow: "0px 0px 15px 5px rgba(0,0,0,0.3)", // Shadow with a soft blur
          zIndex: 9999,
        }}
      />
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Review your order details before proceeding to payment.
        </Typography>
      </Box>

      <List disablePadding>
        {cartData?.products.map((product) => (
          <ListItem key={product.productId + product.variationId}>
            <ListItemText
              primary={capitalizeFirstLetter(product.productName)}
              secondary={`Quantity: ${product.quantity} | Price: ${formatNaira(product.amount * product.quantity)}`}
            />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary="Total Amount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatNaira(totalAmount ?? 0)}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Payment Option" />
          <Typography variant="subtitle1">{paymentOptionLabel()}</Typography>
        </ListItem>
      </List>

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "50%" }}
          onClick={handleProceed}
          disabled={isProcessing} 
        >
          {isProcessing ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </Stack>
    </Container>
  );
};

export default OrderSummaryPage;
