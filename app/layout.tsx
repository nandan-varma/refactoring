import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Code Refactoring Tool",
  description: "Refactor your code using best practices with Gemini AI. Improve code quality, readability, and maintainability instantly.",
  keywords: ["AI", "code refactoring", "Gemini AI", "code quality", "developer tools"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "AI Code Refactoring Tool",
    description: "Refactor your code using best practices with Gemini AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Code Refactoring Tool",
    description: "Refactor your code using best practices with Gemini AI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
