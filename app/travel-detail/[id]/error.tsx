"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function TravelDetailError({ error, reset }: Props) {
  useEffect(() => {
    console.error("🚨 Travel detail page error:", error);
  }, [error]);

  return (
    <div className="p-6 text-red-700">
      <h2 className="text-xl font-bold mb-2">문제가 발생했어요.</h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        다시 시도
      </button>
    </div>
  );
}
