import type { Metadata } from "next";
import "./globals.scss";
import Link from "next/link";

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
      <body>
        <div className="container">{children}</div>
        <footer className="footer">
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <Link href={"/"}>Home</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
