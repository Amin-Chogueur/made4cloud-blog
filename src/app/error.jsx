"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error for debugging (optional)
    console.error(error);
  }, [error]);

  return (
    <div className="h-[80vh] flex flex-col gap-10 justify-center items-center mt-[100px]">
      <h1 className="text-red-700 text-2xl">Something went wrong</h1>
      <p>We encountered an issue while processing your request.</p>
      <button
        className="text-cyan-600 underline"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try Again
      </button>
    </div>
  );
}
