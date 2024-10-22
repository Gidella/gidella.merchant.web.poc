
import React, { createContext, useState, useContext, useEffect } from "react";
import { MerchantModel } from "@/models/merchant";
import { enqueueSnackbar } from "notistack";
import { capitalizeFirstLetter } from "@/utils/helpers";
import { CartModel, CartProductModel, ProductModel, ProductVariationModel } from "@/models/product";

interface MerchantContextProps {
  merchant: MerchantModel | null;
  setMerchant: (merchant: MerchantModel) => void;
  loading: boolean;
  itemsCount: number;
  setItemsCount: (count: number) => void;
  addProductToCart: (product: any) => void;
  updateCartPayment: (paymentMode: number) => void;
  clearCart: () => void;
}

const MerchantContext = createContext<MerchantContextProps | undefined>(undefined);

export const MerchantProvider = ({ children }: { children: React.ReactNode }) => {
  const [merchant, setMerchant] = useState<MerchantModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    const cart: CartModel | null = localStorage.getItem('cart') 
      ? (JSON.parse(localStorage.getItem('cart') as string) as CartModel) 
      : null;
  
    if (cart && cart.products) {
      const totalItemsCount = cart.products.length
      setItemsCount(totalItemsCount);
    }
  }, []);

  const updateMerchant = (merchantData: MerchantModel) => {
    setMerchant(merchantData);
    setLoading(false);
  };

   const addProductToCart = (product: ProductModel) => {
    
    const cart: CartModel | null = localStorage.getItem('cart') 
      ? (JSON.parse(localStorage.getItem('cart')!) as CartModel) 
      : null;
    
      if(cart){
        var thisProduct = cart.products.find(x => x.productId == product.productId && x.variationId == '')
        if(thisProduct){
          var filteredCart = cart.products.filter(x => !(x.productId === product.productId && x.variationId === ''));
          
          thisProduct.quantity += 1
          filteredCart.push(thisProduct)
  
          cart.products = filteredCart
          localStorage.setItem('cart', JSON.stringify(cart));
          setItemsCount(cart.products.length); 
        }else{
         var cartProduct: CartProductModel = {
          productId:      product.productId,
          productName:    product.name,
          variationName:  null,
          amount:         product.amount, 
          variationId:    null,
          quantity:       1,
          imageUrl:       product.mediaURLs[0]
         }
         cart.products.push(cartProduct)
         localStorage.setItem('cart', JSON.stringify(cart));
         setItemsCount(cart.products.length); 
        }
      }else {
        const cartProductModel: CartProductModel = {
          productId:      product.productId,
          productName:    product.name,
          variationName:  '',
          amount:         product.amount, 
          variationId:    '',
          quantity:       1,
          imageUrl:       product.mediaURLs[0]
        }
        const newCart: CartModel = {
          merchantId:   merchant?.merchantId ? merchant.merchantId : '',
          products:     [cartProductModel],
          paymentMode:  0
        };
  
        localStorage.setItem('cart', JSON.stringify(newCart));
        setItemsCount(newCart.products.length); 
      }
    
    enqueueSnackbar(`${capitalizeFirstLetter(product.name)} added to cart successfully...`, { variant: "success", autoHideDuration: 1000 });
  };

  const updateCartPayment = (paymentMode: number) => {
    
    const cart: CartModel | null = localStorage.getItem('cart') 
      ? (JSON.parse(localStorage.getItem('cart')!) as CartModel) 
      : null;
    
      if(cart){
        cart.paymentMode = paymentMode
        localStorage.setItem('cart', JSON.stringify(cart));
        setItemsCount(cart.products.length); 
      } 
  };

  const addProductWithVariationToCart = (product: ProductModel, productVariation: ProductVariationModel) => {
    
    const cart: CartModel | null = localStorage.getItem('cart') 
      ? (JSON.parse(localStorage.getItem('cart')!) as CartModel) 
      : null;
    
    if(cart){
      var thisProduct = cart.products.find(x => x.productId === product.productId && x.variationId === productVariation.variationId)
      if(thisProduct){
        var filteredCart = cart.products.filter(x => !(x.productId === product.productId && x.variationId === productVariation.variationId));
        
        thisProduct.quantity += 1
        filteredCart.push(thisProduct)
  
        cart.products = filteredCart
        localStorage.setItem('cart', JSON.stringify(cart));
        setItemsCount(cart.products.length); 
      }else{

        var cartProduct: CartProductModel = {
          productId:      product.productId,
          variationId:    productVariation.variationId,
          variationName:  productVariation.attributeName,
          amount:         productVariation.adjustedPrice,
          productName:    product.name,
          quantity:       1,
          imageUrl:       product.mediaURLs[0]
         }

        cart.products.push(cartProduct)
        localStorage.setItem('cart', JSON.stringify(cart));
        setItemsCount(cart.products.length); 
        setItemsCount(cart.products.length); 
      }
    }else {
      const cartProductModel: CartProductModel = {
          productId:      product.productId,
          variationId:    productVariation.variationId,
          variationName:  productVariation.attributeName,
          amount:         productVariation.adjustedPrice,
          productName:    product.name,
          quantity:       1,
          imageUrl:       product.mediaURLs[0]
      }
      const newCart: CartModel = {
        merchantId:   merchant?.merchantId ? merchant.merchantId : '',
        products:     [cartProductModel],
        paymentMode:  0
      };

      localStorage.setItem('cart', JSON.stringify(newCart));
      setItemsCount(newCart.products.length); 
    }
    
    enqueueSnackbar(`${capitalizeFirstLetter(product.name)} added to cart successfully...`, { variant: "success", autoHideDuration: 1000 });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setItemsCount(0);
  };

  return (
    <MerchantContext.Provider value={
        { 
          merchant, 
          setMerchant: updateMerchant, 
          loading, 
          itemsCount, 
          setItemsCount, 
          addProductToCart,
          updateCartPayment,
          clearCart
        }}>
      {children}
    </MerchantContext.Provider>
  );
};

export const useMerchant = () => {
  const context = useContext(MerchantContext);
  if (!context) {
    throw new Error("useMerchant must be used within a MerchantProvider");
  }
  return context;
};
