"use client";

import { wagmiAdapter, projectId } from "@/config";
import { createAppKit } from "@reown/appkit/react";
import { mainnet, arbitrum, solana } from "@reown/appkit/networks";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IChildCookie } from "@/interface";
import { metadata, imgPaths, missingProjectId } from "@/constant";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error(missingProjectId);
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, solana],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true,
    connectMethodsOrder: ["wallet"],
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "#00BB7F",
    "--w3m-font-size-master": "9px",
  },
  connectorImages: {
    coinbaseWallet: imgPaths.coinbaseWallet,
    phantom: imgPaths.phantom,
    walletConnect: imgPaths.walletConnect,
  },
});

export const WalletProvider = ({ children, cookies }: IChildCookie) => {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
