"use client";

import React from "react";
import Link from "next/link";

import Logo from "@/components/shared/Logo";
import LoginForm from "@/components/auth/LoginForm";

import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import PageContainer from "@/components/container/PageContainer";

const Login = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
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
        <Grid container spacing={0} justifyContent="center"sx={{ height: "100vh" }}>
          <Grid item xs={12} sm={12} lg={4} xl={3} display="flex" justifyContent="center" alignItems="center">
            <Card elevation={9} sx={{ p: 3, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <LoginForm
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    Login
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                      New to Gidella?
                    </Typography>
                    <Typography component={Link} href="/auth/register" fontWeight="500" sx={{ textDecoration: "none", color: "primary.main", }}>
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

Login.displayName = '/auth/login'
export default Login;
