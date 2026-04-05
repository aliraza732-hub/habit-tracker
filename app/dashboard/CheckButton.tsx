"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckButton({
  habitId,
  isChecked,
}: {
  habitId: string;
  isChecked: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);

    await fetch(`/api/habits/${habitId}/complete`, {
      method: "POST",
    });

    router.refresh();
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleCheck}
      disabled={loading}
      aria-pressed={isChecked}
      aria-label={isChecked ? "Marked complete" : "Mark complete"}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 ${
        isChecked
          ? "animate-check-pop border-violet-600 bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/35"
          : "border-violet-300 bg-white hover:border-violet-500 hover:shadow-sm"
      }`}
    >
      {isChecked && (
        <span className="text-sm font-bold text-white drop-shadow-sm">✓</span>
      )}
    </button>
  );
}
