import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Compleat Villain NEXT",
  description: "Heroes, villains, and worlds free to use for your own works",
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
