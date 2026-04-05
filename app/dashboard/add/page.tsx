"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Health", "Fitness", "Learning", "Mindfulness", "Other"];

export default function AddHabitPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", category: "Health" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/80 via-gray-50 to-gray-50">
      <header className="flex items-center gap-4 border-b border-violet-100/80 bg-white/80 px-6 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer rounded-lg px-2 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
        >
          ← Back
        </button>
        <h1 className="font-semibold tracking-tight text-gray-900">
          New Habit
        </h1>
      </header>

      <div className="mx-auto max-w-xl px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up space-y-6 rounded-2xl border border-gray-100/90 bg-white/90 p-6 shadow-lg shadow-gray-200/50 backdrop-blur-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Habit name
            </label>
            <input
              type="text"
              placeholder="e.g. Morning run"
              className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm outline-none ring-violet-500/20 transition-all placeholder:text-gray-400 focus:border-violet-400 focus:ring-4"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm({ ...form, category: cat })}
                  className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                    form.category === cat
                      ? "border-violet-600 bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/25"
                      : "border-gray-200 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-medium text-white shadow-md shadow-violet-500/25 transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating…" : "Create Habit"}
          </button>
        </form>
      </div>
    </div>
  );
}
