import { handleGetMerchants } from '@/actions/merchant';
import DashboardCard from '@/components/container/DashboardCard';
import Pagination from '@/components/shared/Pagination';
import { PaginatedModel } from '@/models/auth';
import { MerchantModel } from '@/models/merchant';
import { capitalizeFirstLetter, transformToGidellaSubdomain } from '@/utils/helpers';
import {
    Typography, Box, Table, TableBody, TableCell, Button, TableHead, TableRow, Chip, Skeleton, Card, CardContent} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ListMerchants = () => {
    const [paginatedMerchants, setPagination] = useState<PaginatedModel<MerchantModel>>();
    const [loadingMerchants, setLoadingMerchants] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchMerchants = async (page: number) => {
        setLoadingMerchants(true);
        const res = await handleGetMerchants(page); 
        if (res.status) {
            setPagination(res.data.data);
        } else {
            console.error("Failed to fetch merchants");
        }
        setLoadingMerchants(false);
    };

    useEffect(() => {
        fetchMerchants(currentPage);  
    }, [currentPage]);

    return (
        <DashboardCard title="All Merchants" action={
            <Button 
                color="primary"
                component={Link}
                href="/merchants/create-by-admin"
                variant="contained"
                size="medium"    
            >   
                    Add Merchant
            </Button>
          }>
            {loadingMerchants ? (
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table aria-label="loading skeleton table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                {[1, 2, 3, 4, 5].map((index) => (
                                    <TableCell key={index}>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant="rectangular" width={60} height={30} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ) : paginatedMerchants && paginatedMerchants.itemList.length > 0 ? (
                <>
                    <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Business
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Website
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Category
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Location
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedMerchants.itemList.map((merchant) => (
                                    <TableRow key={merchant.businessName}>
                                        <TableCell>
                                            <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                                                {capitalizeFirstLetter(merchant.businessName)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Typography variant="subtitle2" fontWeight={400}>
                                                    {transformToGidellaSubdomain(merchant.businessUrl)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                                {capitalizeFirstLetter(merchant.merchantCategory)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{merchant.location}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Chip 
                                                sx={{ px: "4px", backgroundColor: "primary.main", color: "#fff" }} 
                                                size="medium" 
                                                label="Details"
                                                component={Link}
                                                href={`/merchants/${merchant.merchantId}`}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    <Pagination
                        paginatedData={paginatedMerchants}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h6" component="div" textAlign="center">
                                No merchants available
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </DashboardCard>
    );
};

export default ListMerchants;
