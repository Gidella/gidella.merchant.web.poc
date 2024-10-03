import BlankCard from '@/components/cards/BlankCard';
import MonthlyEarnings from '@/components/cards/MonthlyEarnings';
import ChartCard from '@/components/container/ChartCard';
import DashboardCard from '@/components/container/DashboardCard';
import PageContainer from '@/components/container/PageContainer';
import { Avatar, Box, Button, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MerchantDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; // `id` will hold the GUID when the URL is `/merchant/:id`

  return (
    <PageContainer title="Merchant Dashboard" description="Dashboard for Gidella Merchants">
        <Grid item sm={12}>
            <BlankCard>
                <CardContent>
                    <Typography variant="h5">Business Name</Typography> <br />
                    <Typography variant="body1" color="primary">
                        Website - https://yourbusiness.gidella.site
                    </Typography>
                </CardContent>
            </BlankCard>
        </Grid>
        <br />
        <Box>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
                <ChartCard />
            </Grid>
            <Grid item xs={12} lg={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <DashboardCard title="Products" action={
                        <Button 
                            color="primary" 
                            variant="contained" 
                            size="medium"
                            component={Link}
                            href={`/products/admin-add/${id}`}
                        >   
                            Add Product
                        </Button>
                    }>
                        <Grid container spacing={3}>
                        <br />
                            <Grid 
                                item xs={12} 
                                sm={12}
                            >
                                <Typography 
                                    variant="h3" 
                                    fontWeight="700"
                                    color="primary"
                                    component={Link}
                                    href={`/products/admin-list/${id}`} 
                                >
                                    4 Products 
                                </Typography>
                                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                                    <Typography variant="subtitle2" fontWeight="600">
                                        {/* {formatNaira(900)} */}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {/* Pending */}
                                    </Typography>
                                </Stack>
                                <Stack spacing={2} mt={5} direction="row">
                                <Stack direction="row" spacing={1} alignItems="left">
                                    <Avatar
                                    sx={{ width: 9, height: 9, bgcolor: '#F9F9FD', svg: { display: 'none' } }}
                                    >
                                    </Avatar>
                                    <Chip 
                                        size="medium" 
                                        color="primary"
                                        label="Categories"
                                        component={Link}
                                        href={`/merchants/${id}`}
                                                        />
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="right">
                                    <Avatar
                                    sx={{ width: 9, height: 9, bgcolor: '#F9F9FD', svg: { display: 'none' } }}
                                    ></Avatar>
                                    <Chip 
                                        sx={{ px: "2px", backgroundColor: "primary.main", color: "#fff" }} 
                                        size="medium" 
                                        label="Product Brands"
                                        component={Link}
                                        href={`/merchants/${id}`}
                                                        />
                                </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </DashboardCard>
                    </Grid>
                    <Grid item xs={12}>
                        <MonthlyEarnings />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Box>
  </PageContainer>
  );
};

export default MerchantDetailsPage;