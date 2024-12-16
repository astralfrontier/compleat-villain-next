import type { Metadata } from "next";
import "./globals.scss";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s | Compleat Villain NEXT",
    default: "Compleat Villain NEXT",
  },
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
        <footer className="footer mt-4">
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <p>
                <Link href={"/"}>Home</Link>
              </p>
              <p>
                <Link href={"/game-index"}>Index</Link>
              </p>
              <p>
                <Link
                  href={
                    "https://github.com/astralfrontier/compleat-villain-next"
                  }
                >
                  GitHub
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
