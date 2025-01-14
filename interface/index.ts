import { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";

export type IChildren = {
  children: ReactNode;
};

export type IChildCookie = {
  children: ReactNode;
  cookies: string | null;
};

export type AccountContextType = {
  address: string | undefined;
  isConnected: boolean;
  caipAddress: string | undefined;
  status: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embeddedWalletInfo: any | null;
  openPop: boolean;
  togglePopup: () => void;
};

export interface ITokenData {
  pairs: [];
  schemaVersion: string;
}

export interface ITokenInfo {
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd: string;
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  marketCap: number;
  info: {
    imageUrl: string;
    header: string;
    openGraph: string;
    websites: { label: string; url: string }[];
    socials: { type: string; url: string }[];
  };
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
