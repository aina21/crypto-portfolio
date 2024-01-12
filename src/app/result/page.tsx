"use client";

import { useSearchParams } from "next/navigation";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");

  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-4">
          Cryptocurrency Portfolio Value
        </h1>
        <p className="text-xl">Total Portfolio Value: ${total || 0}</p>
      </div>
    </div>
  );
};

export default ResultPage;
