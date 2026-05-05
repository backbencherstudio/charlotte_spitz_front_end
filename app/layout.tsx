import PencilLoader from "@/components/PencilLoader";
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
                <PencilLoader />
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
