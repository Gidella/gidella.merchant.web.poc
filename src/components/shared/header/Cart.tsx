import React from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useMerchant } from '@/context/MerchantContext';
import Link from 'next/link';

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = () => {
  const { itemsCount } = useMerchant();
  
  return (
    <Button variant="contained" color="primary" component={Link} href="/cart-items" className="cartButton">
        <ShoppingCartIcon />
        <span>
            {itemsCount} 
        </span>
    </Button>
  );
};

export default CartButton;
