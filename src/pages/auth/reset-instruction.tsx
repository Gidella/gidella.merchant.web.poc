"use client";

import React from "react";
import Link from "next/link";

import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/shared/Logo";

import { Grid, Box, Card, Typography, Stack, Button } from "@mui/material";

const ResetInstruction = () => {
  
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
                <form>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                        A reset code has been sent to your email. Please check and follow reset instructions.
                    </Typography>
                    <Box mt={3}>
                        <Button color="primary" variant="contained" component={Link} href="/auth/create-password" size="large" fullWidth type="submit">
                            Proceed
                        </Button>
                    </Box>
                </form>
                
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
ResetInstruction.displayName = '/auth/reset-instruction'
export default ResetInstruction;
