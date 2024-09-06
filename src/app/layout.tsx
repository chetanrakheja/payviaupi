
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../lib/provider";
import { Navbar } from "@/components/Navbar";
import {Footer} from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayViaUPI",
  description: "PayViaUPI is a simple tool to create UPI payment links to accept payments from anyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <Navbar />
              {children}
            <Footer />
          </Providers>
        </body>
    </html>
  );
}
