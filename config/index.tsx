import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { missingProjectId } from "@/constant";

export const projectId = process.env.NEXT_PUBLIC_PROID;

if (!projectId) {
  throw new Error(missingProjectId);
}

export const networks = [mainnet, arbitrum];
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
