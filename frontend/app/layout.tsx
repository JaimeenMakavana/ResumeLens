import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ResumeLens - Ephemeral RAG Assistant",
  description: "RAG-based conversational assistant for recruiters and job seekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
