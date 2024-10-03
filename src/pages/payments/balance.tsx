'use client'
import DashboardCard from '@/components/container/DashboardCard';
import PageContainer from '@/components/container/PageContainer';
import { Grid, Box, useTheme, Avatar, Typography, Stack, Button } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { formatNaira } from '@/utils/helpers'

const MerchantBalance = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = '#ecf2ff';
  const successlight = theme.palette.success.light;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };
  const seriescolumnchart: any = [38, 40, 25];
  
  return (
    <PageContainer title="Merchant Balance" description="Balance for Gidella Merchant">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <br />
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12} lg={8}>
              <DashboardCard title="Balance" action={
                <Button color="primary" variant="contained" size="medium">   
                    Withdraw
                </Button>
              }>
                <Grid container spacing={3}>
                   <br />
                  <Grid item xs={7} sm={7}>
                    <Typography variant="h3" fontWeight="700">
                      {formatNaira(36358)}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                      <Typography variant="subtitle2" fontWeight="600">
                        {formatNaira(900)}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        Pending
                      </Typography>
                    </Stack>
                    <Stack spacing={3} mt={5} direction="row">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                          Active Balance
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
                        ></Avatar>
                        <Typography variant="subtitle2" color="textSecondary">
                          Pending Settlement
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={5} sm={5}>
                    <Chart
                      options={optionscolumnchart}
                      series={seriescolumnchart}
                      type="donut"
                      height={150} width={"100%"}
                    />
                  </Grid>
                </Grid>
              </DashboardCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default MerchantBalance;
