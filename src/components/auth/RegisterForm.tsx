import React, { useState } from "react";
import { Box,Typography, Button, Stack, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CustomTextField from "@/components/forms/CustomTextField";
import { enqueueSnackbar } from "notistack";
import { CreateAccountModel } from "@/models/auth";
import { handleSignup } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface RegisterFormProps {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

const RegisterForm = ({ title, subtitle, subtext }: RegisterFormProps ) => {

    const [error, setError] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const [visible, setVisible] = useState<boolean>(false);

    const [model, setModel] = useState<CreateAccountModel>({
        firstName: "", 
        password: "",
        lastName: "",
        email:"",
        phone:""
    });
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setModel((prevModel) => ({
          ...prevModel,
          [name]: name === "token" ? Number(value) : value,
        }));
      };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        setIsLoading(true); 

        const result = await handleSignup(model);
    
        if (result.status  && result.data.status) {
            await handleLoginWithToken(model.email, model.password);

        } else if(result.status &&  !result.data.status) {
            setError(result.data.message);
            enqueueSnackbar(result.data.message, { variant: "error" });
            setIsLoading(false);
          return
        } else{
            setError("An error occurred. Please try again.");
            enqueueSnackbar("An error occurred. Please try again later.", { variant: "error" });
            setIsLoading(false);
        }
      };

      const handleLoginWithToken = async (email: string, password: string) => {
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            enqueueSnackbar("Account created successfully, Login to continue", { variant: "success" });
            router.push('/auth/login',{ query: { scroll: false } });
            // setIsLoading(false);
        } else {
            enqueueSnackbar("Account created successfully", { variant: "success" });
            router.push('/merchants/create');
            // setIsLoading(false);
        }
      };

    return (
        <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={2}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <form onSubmit={handleSubmit}>
            <Stack>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstname" mb="5px">
                        First Name
                    </Typography>
                    <CustomTextField 
                        type="text" 
                        variant="outlined" 
                        fullWidth 
                        name="firstName"
                        value={model.firstName} 
                        onChange={handleChange} 
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastname" mb="5px">
                        Last Name
                    </Typography>
                    <CustomTextField 
                        type="text" 
                        variant="outlined" 
                        fullWidth 
                        name="lastName"
                        value={model.lastName} 
                        onChange={handleChange} 
                    />
                </Box>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
                        Email
                    </Typography>
                    <CustomTextField 
                        type="email"
                        name="email" 
                        variant="outlined" 
                        fullWidth 
                        value={model.email} 
                        onChange={handleChange} 
                    />
                </Box>
                <Box mt="10px" mb="30px">
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" >
                        Password
                    </Typography>
                    <CustomTextField 
                        type={visible ? "text" : "password"}
                        variant="outlined" 
                        fullWidth 
                        name="password"
                        value={model.password} 
                        onChange={handleChange} 
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setVisible(!visible)}
                                edge="end"
                            >
                                {visible ?  <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                </Box>
            </Stack>
        </form>
        <Box>
            <Button color="primary" variant="contained" size="large" disabled={isLoading} fullWidth onClick={handleSubmit}>   
            {isLoading ? "Processing..." : "Proceed"}
            </Button>
        </Box>
        {subtitle}
    </>
    );
};

export default RegisterForm;
