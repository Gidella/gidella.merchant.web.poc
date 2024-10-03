"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import PageContainer from "@/components/container/PageContainer";
import Logo from "@/components/shared/Logo";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Grid, Box, Card, Typography, Stack, Button, IconButton, InputAdornment } from "@mui/material";
import CustomTextField from "@/components/forms/CustomTextField";
import { handleCreatePassword } from "@/actions/auth";
import { CreatePasswordModel } from "@/models/auth"; 
import { enqueueSnackbar } from "notistack";

const CreatePassword = () => {
  const [model, setModel] = useState<CreatePasswordModel>({
    token: 0, 
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setModel((prevModel) => ({
      ...prevModel,
      [name]: name === "token" ? Number(value) : value,
    }));
  };

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    if (model.password !== model.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      enqueueSnackbar("Passwords do not match.", { variant: "error" });
      return;
    }

    const res = await handleCreatePassword(model);

    if (res.status && res.data.status) {
      enqueueSnackbar("Password created successfully...", { variant: "success" });
      setIsLoading(false);
      await router.push("/auth/login");
    } else if (res.status && !res.data.status) {
        const errorMessage = res.data.message || "An error occurred. Please try again.";
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
        setIsLoading(false);
    } else {
        setError("An error occurred. Please try again.");
        enqueueSnackbar("An error occurred. Please try again later.", { variant: "error" });
        setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (
    <PageContainer title="Create Password" description="Set your new password">
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
                Create New Password
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                      Code
                    </Typography>
                    <CustomTextField
                      name="token"
                      value={model.token || ""}
                      type="number"
                      placeholder="Reset code"
                      fullWidth
                      onChange={handleChange}
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                      Password
                    </Typography>
                    <CustomTextField
                      name="password"
                      value={model.password}
                      type={visible ? "text" : "password"}
                      placeholder="Password"
                      fullWidth
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setVisible(!visible)}
                              edge="end"
                            >
                              {visible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword" mb="5px">
                      Confirm Password
                    </Typography>
                    <CustomTextField
                      name="confirmPassword"
                      value={model.confirmPassword}
                      type={visible ? "text" : "password"}
                      placeholder="Confirm Password"
                      fullWidth
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setVisible(!visible)}
                              edge="end"
                            >
                              {visible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Stack>

                {/* {error && (
                  <Typography color="error" variant="body2" mt={2} textAlign="center">
                    {error}
                  </Typography>
                )} */}

                <Box mt={3}>
                    <Button color="primary" variant="contained" disabled={isLoading} size="large" fullWidth type="submit">
                        {isLoading ? "Processing..." : "Submit"}
                    </Button>
                </Box>
              </form>

              <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Remember Password?
                </Typography>
                <Typography
                  component={Link}
                  href="/auth/login"
                  fontWeight="500"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
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
CreatePassword.displayName = '/auth/create-password'
export default CreatePassword;
