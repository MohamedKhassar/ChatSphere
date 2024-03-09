"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    io("http://localhost:3001")
  })
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
