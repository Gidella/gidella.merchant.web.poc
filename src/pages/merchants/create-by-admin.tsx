'use client'
import DashboardCard from '@/components/container/DashboardCard';
import PageContainer from '@/components/container/PageContainer';
import { Grid, Box, Typography, Stack, Button, SelectChangeEvent, MenuItem, CircularProgress, Select, InputAdornment } from '@mui/material';
import Link from "next/link";
import CustomTextField from '@/components/forms/CustomTextField';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AdminCreateMerchantModel, CategoryModel } from '@/models/merchant';
import { handleAdminCreateMerchantBusiness, handleGetMerchantCategories } from '@/actions/merchant';

const AdminCreateMerchant = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [model, setModel] = useState<AdminCreateMerchantModel>({
    businessURL: "",
    businessName:"",
    longitude:0,
    latitude:0,
    phone:"",
    gisAddress:"",
    categoryId:"",
    firstName: "", 
    lastName: "",
    email:""
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setModel((prevModel) => ({
      ...prevModel,
      [name]: value,
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

  
  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();

    if(model.phone.length < 11){
      enqueueSnackbar("Invalid phone number", { variant: "error" });
      return
    }

    model.categoryId = selectedCategory

    setIsLoading(true);
      
    const res = await handleAdminCreateMerchantBusiness(model);

    if (res.status && res.data.status) {
        enqueueSnackbar(res.data.message, { variant: "success" });
        router.push('/merchants/list');
        setIsLoading(false);
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
    <PageContainer title="Create Merchant" description="Create merchant account on Gidella">
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={12} lg={8} xl={8} justifyContent="center" alignItems="center">
                <DashboardCard title="Create Merchant" action={
                    <Button color="primary" component={Link} href="/merchants/list" variant="contained" size="medium">   
                        Back
                    </Button>
                    }>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="firstname" mb="5px">
                                        Merchant First Name
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
                                        Merchant Last Name
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
                                        Merchant Email
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
                </DashboardCard>
            </Grid>
        </Grid>
    </PageContainer>
  )
}

export default AdminCreateMerchant;
