"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import Logo from "@/components/shared/Logo";

import { Grid, Box, Card, Typography, Stack, Button, InputAdornment, CircularProgress, Select, MenuItem, SelectChangeEvent, TextField } from "@mui/material";
import CustomTextField from "@/components/forms/CustomTextField";
import { enqueueSnackbar } from "notistack";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { CategoryModel, CreateMerchantModel } from "@/models/merchant";
import { handleLogout } from "@/actions/auth";
import { handleCreateMerchantBusiness, handleGetMerchantCategories } from "@/actions/merchant";
import PageContainer from "@/components/container/PageContainer";

const CreateMerchant = () => {

  const { data: session } = useSession();
  const _handleLogout = () => { handleLogout() };
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(""); 
  const [token, setToken] = useState<string>(""); 
  const router = useRouter();
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [model, setModel] = useState<CreateMerchantModel>({
    businessURL: "",
    businessName:"",
    longitude:0,
    latitude:0,
    phone:"",
    gisAddress:"",
    categoryId:"",
  });

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value); 
  };

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      const res = await handleGetMerchantCategories();
      if (res.status) {
        setCategories(res.data.data); 
        setLoadingCategories(false)
      } else {
        console.error("Failed to fetch categories");
        setLoadingCategories(false)
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (session) {
      const token = (session as Session)?.token as string;
      setToken(token)
      
      const { user } = session;
      setFirstName(user.firstName)
    }
  }, [session]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setModel((prevModel) => ({
      ...prevModel,
      [name]: name === "phone" ? Number(value) : value,
    }));
  };

  //map auto complete
  const inputRef = useRef<HTMLInputElement | null>(null); 

  useEffect(() => {
    if (typeof google !== 'undefined' && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const location = place.geometry?.location;

        if (location) {
          // Update model state with the selected place
          setModel(prevModel => ({
            ...prevModel, // Spread existing fields to preserve them
            longitude: location.lng(),
            latitude: location.lat(),
            gisAddress: place.formatted_address || "" // Ensure it's not undefined
          }));
        }
      });
    }
  }, []);


  const handleGetMerchantToken = async () => {
    const result = await signIn('credentials', {
        redirect: false,
        email:"no-email",
        password:token
    });

    if (result?.error) { 
        enqueueSnackbar("Business account created successfully, Login to continue", { variant: "success" });
        handleLogout()
        router.push('/auth/login');
    } else {
        enqueueSnackbar("Business account created successfully", { variant: "success" });
        router.push('/dashboard/merchant');
    }
  };

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    model.categoryId = selectedCategory
    model.phone = model.phone.toString()

    setIsLoading(true);

    const res = await handleCreateMerchantBusiness(model);

    if (res.status && res.data.status) {
      handleGetMerchantToken()
    } else if (res.status && !res.data.status) {
        const errorMessage = res.data.message || "An error occurred. Please try again.";
        enqueueSnackbar(errorMessage, { variant: "error" });
        setIsLoading(false);
    } else {
        enqueueSnackbar("An error occurred. Please try again later.", { variant: "error" });
        setIsLoading(false);
    }
  }

  return (
    <PageContainer title="Create Business Account" description="Create an account for your business">
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
                Hello <b>{capitalizeFirstLetter(firstName)}</b>, Create Business Account
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                        Business Name
                      </Typography>
                      <CustomTextField
                        name="businessName"
                        value={model.businessName || ""}
                        type="text"
                        placeholder="Business Name"
                        fullWidth
                        onChange={handleChange}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                        Phone Number
                      </Typography>
                      <CustomTextField
                        name="phone"
                        value={model.phone || ""}
                        type="number"
                        placeholder="Phone number"
                        fullWidth
                        onChange={handleChange}
                      />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                        Choose Subdomain
                      </Typography>
                      <CustomTextField
                          name="businessURL"
                          value={model.businessURL}
                          onChange={handleChange}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">.gidella.online</InputAdornment>
                            ),
                          }}
                          fullWidth
                          placeholder="Business Subdomain"
                        />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mb="5px">
                          Select Location
                      </Typography>
                      <CustomTextField
                          fullWidth
                          placeholder="Search Location"
                          inputRef={inputRef} // Attach ref to TextField's input element
                          variant="outlined"
                        />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                          Select Category
                      </Typography>
                      {loadingCategories ? 
                        <MenuItem disabled>
                          <Box display="flex" justifyContent="center" width="100%">
                            <CircularProgress size={24} />
                          </Box>
                        </MenuItem>
                       : (
                        <Select 
                            name="categoryId" 
                            variant="outlined"
                            fullWidth
                            value={selectedCategory} 
                            onChange={handleCategoryChange}>
                              {categories.map((category) => (
                                  <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                  </MenuItem>
                                )
                              )}
                        </Select>
                      )}
                    </Box>
                </Stack>
                <Box mt={3}>
                    <Button color="primary" variant="contained" disabled={isLoading} size="large" fullWidth type="submit">
                        {isLoading ? "Processing..." : "Submit"}
                    </Button>
                </Box>
              </form>

              <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="400">
                  Sign in another account?
                </Typography>
                <Typography
                  onClick={_handleLogout}
                  fontWeight="500"
                  sx={{ textDecoration: "none", color: "primary.main" }}
                >
                  Logout
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
CreateMerchant.displayName = '/merchants/create'
export default CreateMerchant;
