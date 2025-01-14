"use client";

import { useEffect, useState } from "react";
import { MainTable } from "@/components/shared/dataTable";
import { ITokenData } from "@/interface";
import { addressess } from "@/constant";

export default function Home() {
  const [data, setData] = useState<ITokenData>();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoad(true);
    async function dataFetch() {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${addressess}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const posts = await response.json();
        setData(posts);
        setLoad(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
        setLoad(false);
      }
    }
    dataFetch();
  }, []);

  return (
    <div className="text-white w-full">
      {load && <div className="w-full text-center pt-12">Loading...</div>}
      {error && <div className="w-full text-center pt-12">Error: {error}</div>}
      {data && !load && <MainTable posts={data?.pairs} />}
    </div>
  );
}
