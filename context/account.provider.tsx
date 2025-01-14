"use client";

import { useState } from "react";
import { createContext, useContext } from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { IChildren, AccountContextType } from "@/interface";

const AccountContext = createContext<AccountContextType | undefined>(undefined);
export const AccountProvider: React.FC<IChildren> = ({ children }) => {
  const [openPop, setOpenPop] = useState(false);
  const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
    useAppKitAccount();
  const togglePopup = () => setOpenPop(!openPop);

  return (
    <AccountContext.Provider
      value={{
        address,
        isConnected,
        caipAddress,
        status,
        embeddedWalletInfo,
        openPop,
        togglePopup,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
