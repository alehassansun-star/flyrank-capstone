import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "FlyRank Capstone",
  description: "Rank tracking dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
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