import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

type RootLayoutProps = Readonly<{ children: React.ReactNode }>

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "E Commerce App | Next",
  description: "First NextJs e-commerce site",
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster/>
        <Script src="https://www.payhere.lk/lib/payhere-2.0.js" strategy="afterInteractive"></Script>
      </body>
    </html>
  );
}
