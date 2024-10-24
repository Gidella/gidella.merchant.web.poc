"use client";

import React, { useState, useRef } from "react";
import { Container, Typography, TextField, Button, Grid, Box, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { handleCreatePassword } from "@/actions/auth";
import { CreatePasswordModel } from "@/models/auth";

const CreatePasswordPage = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  
  const [formErrors, setFormErrors] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChangeCode = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input when a digit is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let errors: any = {};
    let isValid = true;

    if (code.some((digit) => digit === "")) {
      errors.code = "All code fields must be filled";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      const model: CreatePasswordModel = {
        token: 0, 
        password: "",
        confirmPassword: "",
      };

      model.token = Number(code.join(""));
      model.password = formData.password
      model.confirmPassword = formData.confirmPassword
      
      const res = await handleCreatePassword(model);

        if (res.status && res.data.status) {
            enqueueSnackbar("Password created successfully...", { variant: "success", autoHideDuration: 1500 });
            setIsLoading(false);
            await router.push("/login");
        } else if (res.status && !res.data.status) {
            const errorMessage = res.data.message || "An error occurred. Please try again.";
            enqueueSnackbar(errorMessage, { variant: "error", autoHideDuration: 500 });
            setIsLoading(false);
        } else {
            enqueueSnackbar("An error occurred. Please try again later.", { variant: "error", autoHideDuration: 1500 });
            setIsLoading(false);
        }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Password
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Enter reset code sent to your email.
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Code Input Boxes */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              type="number"
              value={digit}
              onChange={(e) => handleChangeCode(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e as React.KeyboardEvent<HTMLInputElement>)}
              inputRef={(el) => (inputsRef.current[index] = el)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: "center" },
              }}
              sx={{ width: 50 }}
              error={!!formErrors.code}
              helperText={index === 5 && formErrors.code} 
            />
          ))}
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="New Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!formErrors.password}
              helperText={formErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              "Reset Password"
            )}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePasswordPage;
