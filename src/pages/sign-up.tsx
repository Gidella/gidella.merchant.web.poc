"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { useMerchant } from "@/context/MerchantContext";
import { CreateAccountModel } from "@/models/auth";
import { handleSignup } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { CartModel } from "@/models/product";
import { handleInitiateSales } from "@/actions/sales";

const SignupPage = () => {
  const router = useRouter();
  const { itemsCount } = useMerchant();

  useEffect(() => {
    if (itemsCount === 0) {
      router.push("/");
    }
  }, [itemsCount, router]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let errors: any = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      errors.phone = "Phone number is invalid";
      isValid = false;
    }

    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
        const model: CreateAccountModel = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        };

        setIsLoading(true); 
        const result = await handleSignup(model);

        if (result.status  && result.data.status) {
            await handleLoginWithToken(model.email, model.password);
        } else if(result.status &&  !result.data.status) {
            enqueueSnackbar(result.data.message, { variant: "error", autoHideDuration: 1000 });
            setIsLoading(false);
            return
        } else{
            enqueueSnackbar("An error occurred. Please try again later.", { variant: "error", autoHideDuration: 1000 });
            setIsLoading(false);
            return
        }
    }
  };

  const handleLoginWithToken = async (email: string, password: string) => {
    const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
    });

    if (result?.error) {
      enqueueSnackbar("Account created successfully, Login to continue", { variant: "success", autoHideDuration: 1000 });
      router.push('/login');
    } else {
      router.push('/order-summary');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up to Checkout
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Please fill out the form to continue to checkout.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="center" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "50%" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="primary" /> 
            ) : (
              "Submit" 
            )}
          </Button>
        </Stack>
      </form>

      {/* Link to Login Page */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body1">
          Already have an account?{" "}
          <MuiLink component={Link} href="/login" underline="hover">
            Log in
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
