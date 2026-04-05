import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: { completions: true },
  });

  const totalHabits = habits.length;
  const totalDone = habits.reduce((sum, h) => sum + h.completions.length, 0);
  const bestStreak = Math.max(
    ...habits.map((h) => calculateStreak(h.completions)),
    0,
  );

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  const initials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "?";

  const imageUrl = session.user.image;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/80 via-gray-50 to-gray-50">
      <header className="border-b border-violet-100/80 bg-white/80 px-6 py-4 backdrop-blur-md">
        <h1 className="font-semibold tracking-tight text-gray-900">Profile</h1>
      </header>

      <div className="mx-auto max-w-xl space-y-4 px-6 py-8">
        <div className="animate-fade-in-up flex flex-col items-center rounded-2xl border border-gray-100/90 bg-white/95 p-8 text-center shadow-lg shadow-gray-200/40">
          <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-violet-200 bg-gradient-to-br from-violet-100 to-purple-100 shadow-inner">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                width={80}
                height={80}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-2xl font-semibold text-violet-600">
                {initials}
              </span>
            )}
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {session.user.name}
          </h2>
          <p className="text-sm text-gray-400">{session.user.email}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100/90 bg-white/95 shadow-md shadow-gray-200/30">
          <div className="stagger-fade">
            {[
              {
                label: "Total habits",
                value: String(totalHabits),
                valueClass: "text-violet-600",
              },
              {
                label: "Best streak",
                value: `🔥 ${bestStreak} days`,
                valueClass: "text-orange-500",
              },
              {
                label: "Total completions",
                value: String(totalDone),
                valueClass: "text-gray-700",
              },
              {
                label: "Member since",
                value: memberSince,
                valueClass: "text-gray-400",
                last: true,
              },
            ].map((row) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-violet-50/30 ${
                  row.last ? "" : "border-b border-gray-50"
                }`}
              >
                <span className="text-sm text-gray-600">{row.label}</span>
                <span
                  className={`text-sm font-medium tabular-nums ${row.valueClass}`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
          className="animate-fade-in delay-3"
        >
          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl border border-red-200 bg-white py-3.5 text-sm font-medium text-red-500 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md active:scale-[0.99]"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
