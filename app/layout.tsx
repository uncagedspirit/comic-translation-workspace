import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "Comic Translation Workspace",
  description: "Translate comics without the Photoshop workflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bangers.variable} font-sans bg-gray-950 text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}