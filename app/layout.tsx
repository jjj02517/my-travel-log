// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import MswProvider from "@/providers/MswProvider";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Log",
  description: "나만의 여행 기록을 남겨보세요",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <MswProvider>
          <ReactQueryProvider>
            <Header />
            <main>{children}</main>
            <footer className="p-4 text-center text-sm text-gray-500">
              ⓒ 2025 Travel Co. All rights reserved.
            </footer>
          </ReactQueryProvider>
        </MswProvider>
      </body>
    </html>
  );
}
