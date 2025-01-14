"use client";

import { MainDatatable } from "@/components/shared/dataTable/mainData";
import { LoginPopup } from "@/components/shared/loginPopup";
import { useAccount } from "@/context/account.provider";
import { dataSor } from "@/data";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { HiArrowSmUp, HiArrowSmDown, HiCheck } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ITokenInfo } from "@/interface";

function getInitials(name: string) {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
  return initials;
}

function formatter(num: number, digits = 1) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MainTable = ({ posts }: any) => {
  const { openPop, isConnected, togglePopup } = useAccount();
  console.log(posts);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ITokenInfo, any>[] = [
    {
      accessorKey: "baseToken.name",
      header: "Profile",
      cell: (baseToken) => {
        const initials = getInitials(baseToken.getValue());
        return (
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-3">
              <AvatarImage
                src={baseToken.row.original.info.imageUrl}
                alt={baseToken.getValue()}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Link
              href={baseToken.row.original.url}
              className="mr-2 hover:underline"
            >
              {baseToken.getValue()}
            </Link>
            <span className="text-slate-500">
              ({baseToken.row.original.baseToken.symbol})
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "priceUsd",
      header: "Price (USD)",
      cell: (priceUsd) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">${priceUsd.getValue()}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "volume.h24",
      header: "Volume (24H)",
      cell: (volume) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">${formatter(volume.getValue())}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "priceChange.h24",
      header: "Price Change % (24H)",
      cell: (priceChange) => {
        return (
          <div className="flex items-center">
            {priceChange.getValue() < 0 ? (
              <p className="mr-2 text-red-500 flex items-center">
                <HiArrowSmDown className="w-4 h-4 mr-1" />
                {priceChange.getValue()}%
              </p>
            ) : (
              <p className="mr-2 text-green-500 flex items-center">
                <HiArrowSmUp className="w-4 h-4 mr-1" />
                {priceChange.getValue()}%
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "liquidity.usd",
      header: "Liquidity",
      cell: (liquidity) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">${formatter(liquidity.getValue())}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "marketCap",
      header: "Market Cap",
      cell: (marketCap) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">${formatter(marketCap.getValue())}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "pairAddress",
      header: "Pair Address",
      cell: (pairAddress) => {
        const lastFiveDigits = pairAddress.getValue().toString().slice(-9);
        return (
          <div className="flex items-center" title={pairAddress.getValue()}>
            <p className="mr-2 text-slate-400">{`..${lastFiveDigits}`}</p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: () => {
        return isConnected ? (
          <div className="text-center font-medium flex">
            <span className="flex items-center border border-green-500 pt-[4px] pb-[6px] px-2 text-xs rounded-md hover:bg-green-500 hover:text-slate-900 cursor-pointer ease-in-out">
              <HiCheck className="mr-1" />
              0.0 ETH
            </span>
          </div>
        ) : (
          <div className="text-center font-medium flex">
            <span
              onClick={() => togglePopup()}
              className="flex items-center border border-green-500 pt-[4px] pb-[6px] px-2 text-xs rounded-md hover:bg-green-500 hover:text-slate-900 cursor-pointer ease-in-out"
            >
              <HiCheck className="mr-1" />
              Quick Buy
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <MainDatatable columns={columns} data={dataSor} />
      {openPop && <LoginPopup />}
    </>
  );
};
