"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/shared/Logo";

import { Grid, Box, Card, Typography, Stack, Button } from "@mui/material";
import CustomTextField from "@/components/forms/CustomTextField";
import { handleForgotPassword } from "@/actions/auth";
import { enqueueSnackbar } from "notistack";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function requestLink(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    setIsLoading(true);

    const res = await handleForgotPassword(email);

    if (res.status && res.data.status) {
      enqueueSnackbar("Password reset request was successful", { variant: "success" });
      await router.push("/auth/reset-instruction");
    } else if (res.status && !res.data.status) {
        const errorMessage = res.data.message || "An error occurred. Please try again.";
        // setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
    } else {
        // setError("An error occurred. Please try again.");
        enqueueSnackbar("An error occurred. Please try again.", { variant: "error" });
    }

    setIsLoading(false);
  }

  return (
    <PageContainer title="Forgot Password" description="Request for a new Password">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "500px" }}>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Logo />
                </Box>

                <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Reset Password
                </Typography>
                <form onSubmit={requestLink}>
                  <Stack>
                      <Box>
                          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                              Email
                          </Typography>
                          <CustomTextField value={email} type="email" placeholder="email" fullWidth 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.currentTarget.value) }
                          />
                      </Box>
                  </Stack>
                  <Box mt="30px">
                    <Button color="primary" variant="contained" disabled={isLoading} size="large" fullWidth type="submit">
                        {isLoading ? "Processing..." : "Submit"}
                    </Button>
                  </Box>
                </form>
                <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    Remember Password?
                  </Typography>
                  <Typography component={Link} href="/auth/login" fontWeight="500" sx={{ textDecoration: "none", color: "primary.main",}}>
                    Sign In
                  </Typography>
                </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
ForgotPassword.displayName = '/auth/forgot-password'
export default ForgotPassword;
