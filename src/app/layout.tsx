"use client";
import { Ubuntu, Rowdies } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/redux/storeProvider"; // Correct import

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  weight: "300",
  subsets: ["latin"],
});

const rowdies = Rowdies({
  variable: "--font-rowdies-one",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta aria-describedby="Made by pranshu" />
        <title>HomeBite</title>
      </head>
      <body className={`${ubuntu.variable} ${rowdies.variable} antialiased`}>
        <StoreProvider>
          {children}
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
