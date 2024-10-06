import React from 'react';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface CartButtonProps {
  itemCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount }) => {
  return (
    <Button variant="contained" color="primary" className="cartButton">
        <ShoppingCartIcon />
        <span className="cartText">
            {itemCount} 
        </span>
    </Button>
  );
};

export default CartButton;
