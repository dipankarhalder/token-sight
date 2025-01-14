import React from "react";
import { Logo } from "@/components/shared/header/logo";
import { WalletBtn } from "@/components/shared/header/walletBtn";
// import { useAccount } from "@/context/account.provider";

export const Header: React.FC = () => {
  // const { address, isConnected, caipAddress, status, embeddedWalletInfo } =
  //   useAccount();

  return (
    <div className="flex px-4 py-3 items-center justify-between border-b border-slate-800">
      <Logo />
      <WalletBtn />
    </div>
  );
};
