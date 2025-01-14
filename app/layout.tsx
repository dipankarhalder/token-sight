import { headers } from "next/headers";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { IChildren, IChildCookie } from "@/interface";
import { Toaster } from "@/components/ui/toaster";
import { WalletProvider } from "@/context/wallet.provider";
import { AccountProvider } from "@/context/account.provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TokenSight",
  description: "A simple trading app",
};

const CombinedProvider = ({ cookies, children }: IChildCookie) => {
  return (
    <WalletProvider cookies={cookies}>
      <AccountProvider>{children}</AccountProvider>
    </WalletProvider>
  );
};

export default async function RootLayout({ children }: Readonly<IChildren>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body
        className={cn("bg-slate-950 font-sans antialiased", fontSans.variable)}
      >
        <CombinedProvider cookies={cookies}>{children}</CombinedProvider>
        <Toaster />
      </body>
    </html>
  );
}
