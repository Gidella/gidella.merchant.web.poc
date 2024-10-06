
import React, { createContext, useState, useContext, useEffect } from "react";
import { MerchantModel } from "@/models/merchant";

interface MerchantContextProps {
  merchant: MerchantModel | null;
  setMerchant: (merchant: MerchantModel) => void;
  loading: boolean;
}

const MerchantContext = createContext<MerchantContextProps | undefined>(undefined);

export const MerchantProvider = ({ children }: { children: React.ReactNode }) => {
  const [merchant, setMerchant] = useState<MerchantModel | null>(null);
  const [loading, setLoading] = useState(true);

  const updateMerchant = (merchantData: MerchantModel) => {
    setMerchant(merchantData);
    setLoading(false);
  };

  return (
    <MerchantContext.Provider value={{ merchant, setMerchant: updateMerchant, loading }}>
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
