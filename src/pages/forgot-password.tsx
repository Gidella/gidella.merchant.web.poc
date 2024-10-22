"use client";

import React, { useState } from "react";
import { Container, Typography, TextField, Button, Grid, Box, CircularProgress, Stack, Link as MuiLink, } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import Link from "next/link";
import { handleForgotPassword } from "@/actions/auth";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email address is invalid");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail()) {
      setIsLoading(true);
      
      const res = await handleForgotPassword(email);

        if (res.status && res.data.status) {
            enqueueSnackbar("Password reset request was successful", { variant: "success", autoHideDuration: 1000 });
            await router.push("/password-reset-instruction");
            return;
        } else if (res.status && !res.data.status) {
            const errorMessage = res.data.message || "An error occurred. Please try again.";
            enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 500 });
        } else {
            enqueueSnackbar("An error occurred. Please try again.", { variant: "error", autoHideDuration: 1000 });
        }
        setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password?
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Enter your email to reset your password.
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
              value={email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
        </Grid>

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
          Remembr your password?{" "}
          <MuiLink component={Link} href="/login" underline="hover">
            Login
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
