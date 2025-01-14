import React from "react";
import { useAccount } from "@/context/account.provider";

export const LoginPopup = () => {
  const { togglePopup } = useAccount();

  return (
    <div className="top-0 left-0 w-full fixed h-screen bg-gray-900/80 flex justify-center items-center">
      <div className="bg-slate-950 border border-slate-500 rounded-md w-[460px] px-5 py-9">
        <h2 className="w-full text-md font-bold text-center mb-3">
          Sig-in with wallet
        </h2>
        <p className="text-center text-sm font-medium text-slate-500">
          Please sign-in with your wallet and continue <br />
          the process...
        </p>
        <div
          className="mt-12 flex justify-center"
          onClick={() => togglePopup()}
        >
          <appkit-button size="md" label="Sign In" />
        </div>
      </div>
    </div>
  );
};
