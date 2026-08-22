import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyRank Capstone",
  description: "Rank tracking dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 p-4 border-b border-gray-200">
          <a href="/" className="font-semibold">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/settings">Settings</a>
          <a href="/health">Health</a>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}