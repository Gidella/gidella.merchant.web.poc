"use client";

import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";

const CodeSentPage = () => {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/create-password");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Check Your Email
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          A code has been sent to your email. Please check your inbox and follow the instructions to reset your password.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleProceed}
        >
          Proceed to Create New Password
        </Button>
      </Box>
    </Container>
  );
};

export default CodeSentPage;
