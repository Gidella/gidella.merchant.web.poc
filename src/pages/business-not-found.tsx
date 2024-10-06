"use client";

import React from "react";
import { Typography, Container, Box } from "@mui/material";

const BusinessNotFound = () => {
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
                  Website not found!
                </Typography>
                <Typography variant="body1">
                  Website with the address you just entered was not found.
                </Typography>
            </Box>
        </Container>
    );
};

export default BusinessNotFound;
