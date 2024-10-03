import React, { useState } from "react";
import { Box,Typography, FormGroup,FormControlLabel, Button, Stack, Checkbox, IconButton, InputAdornment } from "@mui/material";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CustomTextField from "@/components/forms/CustomTextField";
import { signIn } from "next-auth/react";
import { enqueueSnackbar } from "notistack";

interface LoginFormProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const LoginForm = ({ title, subtitle, subtext }: LoginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [visible, setVisible] = useState<boolean>(false); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setIsLoading(true); 
    
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result?.error);
      enqueueSnackbar("Invalid Login credentials", { variant: "error" });
      setIsLoading(false);
      return
    } else {
      enqueueSnackbar("Login successful", { variant: "success" });
      window.location.href = "/";
    }
  };

  return  (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
            Email
          </Typography>
          <CustomTextField 
            type="email" 
            variant="outlined" 
            fullWidth 
            value={email} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
          />
        </Box>
        <Box mt="10px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" >
            Password
          </Typography>
          <CustomTextField 
            type={visible ? "text" : "password"}
            variant="outlined" 
            fullWidth 
            value={password} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} 
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible(!visible)}
                    edge="end"
                  >
                    {visible ? <Visibility /> : <VisibilityOff /> }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2} >
          <FormGroup>
            <FormControlLabel 
              control={<Checkbox defaultChecked />} 
              label="Remeber this Device" 
            />
          </FormGroup>
          <Typography 
            component={Link} 
            href="/auth/forgot-password" 
            fontWeight="500" 
            sx={{ textDecoration: "none", color: "primary.main",}}>
              Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button color="primary" variant="contained" size="large" disabled={isLoading} fullWidth onClick={handleSubmit}>   
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default LoginForm;
