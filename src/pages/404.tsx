"use client";

import React from "react";
import { Typography, Container, Box } from "@mui/material";

const Custom404 = () => {
    return (
            <Container>
            <Box sx={{ mt: 4 }}>
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