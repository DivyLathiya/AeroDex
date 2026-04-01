import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";
import Link from "next/link";
import { Plane } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AeroDex - Aviation Intelligence Platform",
  description: "Comprehensive database of commercial aircraft variants, specs, and engines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-white/5 py-8 mt-auto bg-background">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Plane className="h-5 w-5 text-primary" />
              <span>AeroDex</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; 2026 DivyLathiya. All Rights Reserved
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/aircraft" className="hover:text-primary transition-colors">Directory</Link>
              <Link href="/compare" className="hover:text-primary transition-colors">Compare</Link>
              <Link href="/engines" className="hover:text-primary transition-colors">Engines</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
