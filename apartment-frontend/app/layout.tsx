import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apartment Finder",
  description: "Find your next perfect apartment",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}