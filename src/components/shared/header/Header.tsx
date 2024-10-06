import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import Image from "next/image"
import { getAvatarUrl } from '@/utils/helpers';
import { useMerchant } from "@/context/MerchantContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartButton from './Cart';


interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = () => {
  const { merchant, loading } = useMerchant();
  const itemCount = 5;
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          {loading ? (
            // Show loading state (a circular shadow for example) while waiting for data
            <Box 
              sx={{ 
                width: 55, 
                height: 55, 
                borderRadius: "50%", 
                backgroundColor: "gray", 
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" 
              }} />
            ) : (
              merchant?.logoImageURL == null || undefined ? (
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <Image 
                    src={getAvatarUrl(merchant?.businessName as string)} 
                    alt="Merchant Logo" 
                    style={{ objectFit: "cover" }} 
                    height={60} 
                    width={60} 
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <Image 
                    src={merchant?.logoImageURL as string} 
                    alt="Merchant Logo" 
                    style={{ objectFit: "cover" }} 
                    height={60} 
                    width={60} 
                  />
                </Box>
              )
            )}
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <CartButton itemCount={itemCount} />
          {/* <Button variant="contained" component={Link} href="/authentication/login"   disableElevation color="primary" >
            Login
          </Button> */}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
