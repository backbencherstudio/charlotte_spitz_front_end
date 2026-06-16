import { ReduxProvider } from "@/src/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CVdigger",
  description: "CVdigger is a platform for creating and managing your CVs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Toaster richColors position="top-center" />
        <ReduxProvider>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="p-6 w-full min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5952FF] mx-auto mb-4"></div>
                    <p className="text-[#4a4c56]">
                      Loading submission data, please wait...
                    </p>
                  </div>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
