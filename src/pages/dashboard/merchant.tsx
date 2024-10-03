'use client'
import BlankCard from '@/components/cards/BlankCard';
import MonthlyEarnings from '@/components/cards/MonthlyEarnings';
import ProductPerformance from '@/components/cards/ProductPerformance';
import RecentTransactions from '@/components/cards/RecentTransactions';
import WalletBalance from '@/components/cards/WalletBalance';
import ChartCard from '@/components/container/ChartCard';
import PageContainer from '@/components/container/PageContainer';
import { Grid, Box, Typography, CardContent } from '@mui/material';

const MerchantDashboard = () => {
  return (
    <PageContainer title="Merchant Dashboard" description="Dashboard for Gidella Merchants">
      <Grid item sm={12}>
          <BlankCard>
              <CardContent>
                  <Typography variant="h5">Hello Samuel</Typography> <br />
                  <Typography variant="body1" color="primary">
                    Your business website is <b>https://yourbusiness.gidella.site</b>
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
                <WalletBalance />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default MerchantDashboard;
