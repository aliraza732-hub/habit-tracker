"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
      setLoading(false);
    } else {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-100/35 via-gray-50 to-violet-100/40 p-4">
      <div
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 -translate-y-1/4 translate-x-1/4 rounded-full bg-purple-400/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 -translate-x-1/4 translate-y-1/4 rounded-full bg-violet-400/15 blur-3xl"
        aria-hidden
      />

      <div className="animate-scale-in relative w-full max-w-md">
        <div className="rounded-2xl border border-white/60 bg-white/90 p-8 shadow-xl shadow-purple-200/35 backdrop-blur-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-violet-600 text-xl font-bold text-white shadow-lg shadow-purple-500/30">
              H
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Create account
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Start tracking your habits today
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-4 animate-fade-in rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              autoComplete="name"
              className="w-full rounded-xl border border-gray-200 bg-white/80 p-3.5 text-sm outline-none ring-violet-500/20 transition-all placeholder:text-gray-400 focus:border-violet-400 focus:ring-4"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className="w-full rounded-xl border border-gray-200 bg-white/80 p-3.5 text-sm outline-none ring-violet-500/20 transition-all placeholder:text-gray-400 focus:border-violet-400 focus:ring-4"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-200 bg-white/80 p-3.5 text-sm outline-none ring-violet-500/20 transition-all placeholder:text-gray-400 focus:border-violet-400 focus:ring-4"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 py-3.5 text-sm font-medium text-white shadow-md shadow-purple-500/25 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              or
            </span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/50 hover:shadow-md active:scale-[0.99]"
          >
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt=""
              width={18}
              height={18}
              className="h-[18px] w-[18px]"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-violet-600 underline-offset-2 transition-colors hover:text-violet-700 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
