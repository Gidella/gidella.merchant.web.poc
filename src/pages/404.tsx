"use client";

import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Custom404 = () => {
    return (
            <Container>
            <Box 
              sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '50vh', // Ensure it takes the full viewport height
                  mt: 2
              }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                  Page Not Found!!
                </Typography>
                <Typography variant="body1">
                  You`ve landed on a wrong route...
                </Typography>
                <br />
            </Box>
            </Container>
        );
};

export default Custom404;