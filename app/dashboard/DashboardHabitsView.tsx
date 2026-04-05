import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DeleteButton from "./DeleteButton";
import CheckButton from "./CheckButton";
import { calculateStreak } from "@/lib/streak";
import Link from "next/link";

export default async function DashboardHabitsView() {
  const session = await auth();
  if (!session) redirect("/login");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const habits = await prisma.habit.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      completions: true,
    },
  });

  const habitsWithToday = habits.map((habit) => ({
    ...habit,
    doneToday: habit.completions.some(
      (c) => new Date(c.date) >= today && new Date(c.date) < tomorrow,
    ),
    streak: calculateStreak(habit.completions),
  }));

  const doneCount = habitsWithToday.filter((h) => h.doneToday).length;
  const bestStreak = Math.max(...habitsWithToday.map((h) => h.streak), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/80 via-gray-50 to-gray-50">
      <header className="border-b border-violet-100/80 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between shadow-sm shadow-violet-100/50">
        <div className="flex items-center gap-3 animate-fade-in">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/25 ring-2 ring-white">
            <span className="text-sm font-bold">H</span>
          </div>
          <h1 className="font-semibold tracking-tight text-gray-900">
            Habit Tracker
          </h1>
        </div>
        <span className="animate-fade-in text-sm text-gray-500 delay-1">
          Hey, {session.user.name}! 👋
        </span>
      </header>

      <div className="mx-auto max-w-xl px-6 py-8">
        <div className="mb-8 grid grid-cols-3 gap-3 stagger-fade">
          <div className="rounded-2xl border border-gray-100/80 bg-white/90 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-violet-600 tabular-nums">
              {doneCount}
            </p>
            <p className="mt-1 text-xs text-gray-400">Done today</p>
          </div>
          <div className="rounded-2xl border border-gray-100/80 bg-white/90 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-orange-500 tabular-nums">
              {bestStreak}
              <span className="ml-0.5 inline-block origin-center animate-pulse-subtle">
                🔥
              </span>
            </p>
            <p className="mt-1 text-xs text-gray-400">Best streak</p>
          </div>
          <div className="rounded-2xl border border-gray-100/80 bg-white/90 p-4 text-center shadow-sm shadow-gray-200/40 transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-2xl font-semibold text-gray-700 tabular-nums">
              {habits.length}
            </p>
            <p className="mt-1 text-xs text-gray-400">Total habits</p>
          </div>
        </div>

        <div className="mb-6 flex animate-fade-in-up items-center justify-between delay-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
              My Habits
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {doneCount} of {habits.length} done today
            </p>
          </div>

          <Link
            href="/dashboard/add"
            className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-violet-500/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/35 active:scale-[0.98]"
          >
            <span className="text-lg leading-none">+</span>
            Add Habit
          </Link>
        </div>

        {habits.length === 0 ? (
          <div className="animate-scale-in rounded-2xl border border-dashed border-violet-200 bg-white/60 py-16 text-center text-gray-400 backdrop-blur-sm">
            <p className="text-lg font-medium text-gray-600">No habits yet!</p>
            <p className="mt-2 text-sm">
              Add your first habit to get started
            </p>
            <Link
              href="/dashboard/add"
              className="mt-6 inline-flex cursor-pointer rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-violet-700 hover:shadow-md"
            >
              Create a habit
            </Link>
          </div>
        ) : (
          <ul className="stagger-fade space-y-3">
            {habitsWithToday.map((habit) => (
              <li
                key={habit.id}
                className={`flex items-center justify-between rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:shadow-md ${
                  habit.doneToday
                    ? "border-violet-200/80 bg-gradient-to-r from-violet-50/90 to-white"
                    : "border-gray-100/90 bg-white/95 hover:border-violet-100"
                }`}
              >
                <div className="min-w-0 flex-1 pr-3">
                  <p
                    className={`font-medium transition-colors ${
                      habit.doneToday
                        ? "text-violet-800 line-through decoration-violet-300"
                        : "text-gray-900"
                    }`}
                  >
                    {habit.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {habit.category}
                    </span>
                    {habit.streak > 0 && (
                      <span className="text-xs font-medium text-orange-500">
                        🔥 {habit.streak} day{habit.streak > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <CheckButton habitId={habit.id} isChecked={habit.doneToday} />
                  <DeleteButton habitId={habit.id} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
