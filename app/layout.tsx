import Navbar from "@/components/navbar";
import QueryProvider from "@/lib/Queryprovider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/lib/redux/redux-provider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <QueryProvider>
            <Toaster position="bottom-center" />
            <Navbar />
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
