"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/app/dashboard/BottomNav";

const HIDE_NAV_PREFIXES = ["/login", "/register"];

export default function AppChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNav = HIDE_NAV_PREFIXES.some((p) => pathname.startsWith(p));

  return (
    <div className={hideNav ? "min-h-screen" : "min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))]"}>
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}
