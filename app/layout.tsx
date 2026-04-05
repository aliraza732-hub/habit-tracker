import type { Metadata } from "next";
import "./globals.css";
import AppChrome from "@/components/AppChrome";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased text-gray-900">
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
