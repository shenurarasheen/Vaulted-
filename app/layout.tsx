import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "E Comerce App | Next",
  description: "First NextJs e-commerce site",
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
