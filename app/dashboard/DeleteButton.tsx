"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ habitId }: { habitId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="cursor-pointer text-sm text-red-400 underline-offset-2 transition-colors duration-200 hover:text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "…" : "Delete"}
    </button>
  );
}
