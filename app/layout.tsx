

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard with OTP authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className={inter.className} >
        <ThemeProvider
        
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <AuthProvider>
            <Navbar />
            {children}
            <Toaster  />
          </AuthProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}