// /pages/products/[adminAddId].tsx
'use client'
import DashboardCard from '@/components/container/DashboardCard';
import PageContainer from '@/components/container/PageContainer';
import { Grid, Box, Typography, Stack, Button, SelectChangeEvent, MenuItem, CircularProgress, Select } from '@mui/material';
import Link from "next/link";
import CustomTextField from '@/components/forms/CustomTextField';
import { enqueueSnackbar } from 'notistack';
import { handleCreateProduct, handleGetProductBrand, handleGetProductCategories } from '@/actions/product';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { CategoryModel } from '@/models/merchant';
import { CreateProductModel } from '@/models/product';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { handleImageUpload } from '@/actions/upload';

const AdminAddProduct = () => {
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [brands, setBrands] = useState<CategoryModel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loadingBrands, setLoadingBrands] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [imageFile, setImageFile] = useState<File | null>(null); 
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { merchantId } = router.query;
    const _merchantId = Array.isArray(merchantId) ? merchantId[0] : merchantId;

    const [model, setModel] = useState<CreateProductModel>({
        name: "",
        description:"",
        amount:0,
        imageUrl:"",
        productBrandId:"",
        productCategoryId:"",
      });
    
      const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
          setImageFile(file); // Store the file for uploading
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string); // Set preview URL
          };
          reader.readAsDataURL(file); // Read the file as a data URL
        }
      };
    
     
      const fetchCategories = async (merchantId: string) => {
        setLoadingCategories(true)
        const res = await handleGetProductCategories(merchantId);
        if (res.status) {
          setCategories(res.data.data); 
          setLoadingCategories(false)
        } else {
          console.error("Failed to fetch categories");
          setLoadingCategories(false)
        }
      };

      const fetchBrands = async (merchantId: string) => {
        setLoadingBrands(true)
        const res = await handleGetProductBrand(merchantId);
        if (res.status) {
          setBrands(res.data.data); 
          setLoadingBrands(false)
        } else {
          console.error("Failed to fetch product brands");
          setLoadingBrands(false)
        }
      };
    
      useEffect(() => {
        if(_merchantId !== undefined){
            fetchCategories(_merchantId);
            fetchBrands(_merchantId);
        }
      }, [_merchantId]);

      const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value); 
      };
    
      const handleBrandChange = (event: SelectChangeEvent<string>) => {
        setSelectedBrand(event.target.value); 
      };
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        setModel((prevModel) => ({
          ...prevModel,
          [name]: value,
        }));
      };
    
      
      async function handleSubmit(event: React.FormEvent): Promise<void> {
        event.preventDefault();

        if(!_merchantId){ return }
    
        if(model.amount < 100){
          enqueueSnackbar("Amount should not be less than N100", { variant: "error" });
          return
        }
    
        model.productCategoryId = selectedCategory
        model.productBrandId = selectedBrand !== "" ? selectedBrand : null
    
        setIsLoading(true);
    
        if (imageFile) {
          const formData = new FormData();
          formData.append('content', imageFile);
        
          const imageUploadResponse = await handleImageUpload(formData);
    
          if (!imageUploadResponse.status) {
            enqueueSnackbar("An error occurred while uploading image. Please try again.", { variant: "error" });
            setIsLoading(false);
            return
          } else if (imageUploadResponse.status && !imageUploadResponse.data.status) {
              const errorMessage = imageUploadResponse.data.message || "An error occurred while uploading image. Please try again.";
              enqueueSnackbar(errorMessage, { variant: "error" });
              setIsLoading(false);
              return
          } 
    
          model.imageUrl = imageUploadResponse.data.data
        }
        else {
          enqueueSnackbar("Product image is required", { variant: "error" });
          setIsLoading(false);
          return
        }
          

        const res = await handleCreateProduct(model, _merchantId);
    
        if (res.status && res.data.status) {
            enqueueSnackbar(res.data.message, { variant: "success" });
            router.push(`/products/admin-list/${_merchantId}`);
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
        <PageContainer title="Add Product" description="Add your product on Gidella">
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={12} lg={8} xl={8} justifyContent="center" alignItems="center">
                    <DashboardCard title="Add Product for Business Name" action={
                        <Button color="primary" component={Link} href={`/merchants/${merchantId}`} variant="contained" size="medium">   
                            Back
                        </Button>
                        }>
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                                            Name
                                        </Typography>
                                        <CustomTextField
                                            name="name"
                                            value={model.name}
                                            type="text"
                                            placeholder="Name"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                                            Description
                                        </Typography>
                                        <CustomTextField
                                            name="description"
                                            value={model.description}
                                            type="text"
                                            placeholder="Description"
                                            fullWidth
                                            onChange={handleChange}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="confirmPassword" mb="5px">
                                            Amount
                                        </Typography>
                                        <CustomTextField
                                            name="amount"
                                            value={model.amount}
                                            type="number"
                                            placeholder="Amount"
                                            fullWidth
                                            onChange={handleChange}
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
                                                    {capitalizeFirstLetter(category.name)}
                                                </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    )}
                                    </Box>
                                    <Box>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="token" mb="5px">
                                        Select Brand
                                    </Typography>
                                    {loadingBrands ? 
                                        <MenuItem disabled>
                                        <Box display="flex" justifyContent="center" width="100%">
                                            <CircularProgress size={24} />
                                        </Box>
                                        </MenuItem>
                                    : (
                                        <Select 
                                            name="brandId" 
                                            variant="outlined"
                                            fullWidth
                                            value={selectedBrand} 
                                            onChange={handleBrandChange}>
                                            {brands.map((category) => (
                                                <MenuItem key={category.id} value={category.id}>
                                                    {capitalizeFirstLetter(category.name)}
                                                </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    )}
                                    </Box>
                                    <Box>
                                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="image" mb="5px">
                                        Upload Image
                                    </Typography>
                                    <CustomTextField
                                            name="image"
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            placeholder="Select Image to upload"
                                            fullWidth
                                            onChange={handleImageChange}
                                        />
                                    </Box>
                                    {imagePreview && (
                                    <Box mt={2}>
                                        <Image 
                                        src={imagePreview} 
                                        width={300} 
                                        height={200} 
                                        alt="Image Preview" style={{ objectFit: 'contain' }} />
                                    </Box>
                                    )}
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
    );
};

export default AdminAddProduct;
