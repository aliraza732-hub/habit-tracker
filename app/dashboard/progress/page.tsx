import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";

export default async function ProgressPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    include: { completions: true },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 6 + i);
    return date;
  });

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  const totalDone = habits.reduce(
    (sum, h) => sum + h.completions.length,
    0,
  );

  const bestStreak = Math.max(
    ...habits.map((h) => calculateStreak(h.completions)),
    0,
  );

  const thisWeekStart = weekDays[0];
  const thisWeekEnd = new Date(today);
  thisWeekEnd.setDate(thisWeekEnd.getDate() + 1);

  const thisWeekDone = habits.reduce((sum, h) => {
    return (
      sum +
      h.completions.filter(
        (c) =>
          new Date(c.date) >= thisWeekStart &&
          new Date(c.date) < thisWeekEnd,
      ).length
    );
  }, 0);

  const maxThisWeek = habits.length * 7;
  const weekPercent =
    maxThisWeek > 0 ? Math.round((thisWeekDone / maxThisWeek) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/80 via-gray-50 to-gray-50">
      <header className="border-b border-violet-100/80 bg-white/80 px-6 py-4 backdrop-blur-md">
        <h1 className="font-semibold tracking-tight text-gray-900">Progress</h1>
      </header>

      <div className="mx-auto max-w-xl space-y-6 px-6 py-8">
        <div className="grid grid-cols-3 gap-3 stagger-fade">
          <div className="rounded-2xl border border-gray-100/90 bg-white/95 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-violet-600 tabular-nums">
              {bestStreak}
            </p>
            <p className="mt-1 text-xs text-gray-400">Day streak</p>
          </div>
          <div className="rounded-2xl border border-gray-100/90 bg-white/95 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-emerald-500 tabular-nums">
              {weekPercent}%
            </p>
            <p className="mt-1 text-xs text-gray-400">This week</p>
          </div>
          <div className="rounded-2xl border border-gray-100/90 bg-white/95 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-orange-500 tabular-nums">
              {totalDone}
            </p>
            <p className="mt-1 text-xs text-gray-400">Total done</p>
          </div>
        </div>

        <div className="animate-fade-in-up rounded-2xl border border-gray-100/90 bg-white/95 p-5 shadow-md shadow-gray-200/30 delay-2">
          <h2 className="mb-4 font-medium text-gray-900">This week</h2>
          <div className="flex gap-2">
            {weekDays.map((date, i) => {
              const isToday = date.getTime() === today.getTime();
              const dayDone = habits.some((h) =>
                h.completions.some((c) => {
                  const d = new Date(c.date);
                  d.setHours(0, 0, 0, 0);
                  return d.getTime() === date.getTime();
                }),
              );

              return (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center gap-1.5"
                >
                  <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    {dayLabels[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                  </span>
                  <div
                    className={`flex aspect-square w-full items-center justify-center rounded-xl text-xs font-semibold transition-all duration-300 ${
                      isToday
                        ? "bg-violet-200 text-violet-800 ring-2 ring-violet-400/50 ring-offset-2 ring-offset-white"
                        : dayDone
                          ? "bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/25"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="animate-fade-in-up rounded-2xl border border-gray-100/90 bg-white/95 p-5 shadow-md shadow-gray-200/30 delay-3">
          <h2 className="mb-4 font-medium text-gray-900">Habit completion</h2>
          {habits.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">
              No habits yet!
            </p>
          ) : (
            <ul className="stagger-fade space-y-5">
              {habits.map((habit) => {
                const total = habit.completions.length;
                const rate =
                  total > 0 ? Math.min(Math.round((total / 30) * 100), 100) : 0;

                return (
                  <li key={habit.id}>
                    <div className="mb-1.5 flex justify-between text-sm">
                      <span className="font-medium text-gray-800">
                        {habit.name}
                      </span>
                      <span className="tabular-nums text-gray-400">{rate}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500 shadow-sm transition-[width] duration-700 ease-out"
                        style={{ width: `${rate}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
