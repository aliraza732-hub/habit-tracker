"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  {
    href: "/dashboard",
    label: "Habits",
    icon: (active: boolean) => (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.5 : 1.5}
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/progress",
    label: "Progress",
    icon: (active: boolean) => (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.5 : 1.5}
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: (active: boolean) => (
      <svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={active ? 2.5 : 1.5}
        className="transition-transform duration-200 group-hover:scale-110"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 007-7z"
        />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-violet-100/80 bg-white/90 px-4 py-2 shadow-[0_-4px_24px_-8px_rgba(109,40,217,0.12)] backdrop-blur-lg supports-[padding:max(0px)]:pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-xl justify-around pt-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex min-w-[4.5rem] cursor-pointer flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition-all duration-200 ${
                active
                  ? "text-violet-600"
                  : "text-gray-400 hover:text-violet-500"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-violet-100 shadow-inner shadow-violet-200/50"
                    : "group-hover:bg-gray-50"
                }`}
              >
                {link.icon(active)}
              </span>
              <span className="text-[11px] font-medium tracking-wide">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
