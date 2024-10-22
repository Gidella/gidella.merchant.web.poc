"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Link as MuiLink,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors: any = {};
    let isValid = true;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        enqueueSnackbar("Invalid Login credentials", { variant: "error", autoHideDuration: 1500 });
        setIsLoading(false);
      } else {
        enqueueSnackbar("Login successful", { variant: "success", autoHideDuration: 1500 });
        router.push("/order-summary");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login to Checkout
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Login to continue to checkout.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Forgot Password Link */}
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <MuiLink component={Link} href="/forgot-password" underline="hover">
            Forgot Password?
          </MuiLink>
        </Box>

        <Stack direction="row" justifyContent="center" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ width: "50%", position: "relative" }}
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

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body1">
          Don't have an account?{" "}
          <MuiLink component={Link} href="/sign-up" underline="hover">
            Sign up
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
