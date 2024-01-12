"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { validationSchema } from "./utils/validation";
import { BalanceSymbolPairs } from "./component/balance-symbol-pairs";
import { useRouter } from "next/navigation";

export interface BalancePair {
  coin: string;
  balance: string;
}

interface BalancePairValues {
  balancePairs: BalancePair[];
}
interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
  };
}

const getSimplePrice = async (
  cryptoIds: string[]
): Promise<CoinGeckoResponse> => {
  const idsString = cryptoIds.join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
};

const initialValues: { balancePairs: BalancePair[] } = {
  balancePairs: [
    { coin: "", balance: "" },
    { coin: "", balance: "" },
  ],
};

const MainPage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (values: BalancePairValues) => {
    setIsLoading(true);
    const cryptoIds = values.balancePairs.map((pair) => pair.coin);

    try {
      const data = await getSimplePrice(cryptoIds);

      const totalValueUSD = values.balancePairs.reduce((total, pair) => {
        const usdValue = data[pair.coin]?.usd || 0;
        const balance = parseFloat(pair.balance) || 0;
        return total + usdValue * balance;
      }, 0);

      router.push(`/result?total=${totalValueUSD.toString()}`);
    } catch (error: any) {
      console.error("Error fetching crypto prices:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container p-4 max-w-[800px]">
        <h1 className="text-3xl font-semibold mb-4">Main Page</h1>
        {error && <p className="text-rose-500">{error}</p>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {(isSubmit) => (
            <Form>
              <BalanceSymbolPairs />
              <button
                type="submit"
                className="bg-green-300 text-white py-2 px-4 rounded hover:bg-green-200 disabled:bg-gray-300 disabled:text-gray-500"
                disabled={isLoading || !isSubmit.isValid}
              >
                {isLoading ? "Loading..." : "Show Result"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MainPage;
