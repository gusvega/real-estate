'use client'

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MyContextProvider } from '../server/MyContext.js'


const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Gus Vega - Real Estate",
//   description: "Generated by create next app",
// };

export default function RootLayout({

  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <MyContextProvider>
      <body className={inter.className}>{children}</body>
      </MyContextProvider>
    </html>
  );
}
