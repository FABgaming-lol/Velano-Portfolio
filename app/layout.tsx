import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "VELANO — An AVOLIRO Division",
  description:
    "Velano engineers scalable digital systems for serious brands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-main text-white antialiased`}>
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-widest">
              AVOLIRO<span className="accent"> / </span>VELANO
            </span>

            <nav className="flex items-center gap-6 text-sm">
              <a href="#systems" className="nav-link">Systems</a>
              <a href="#process" className="nav-link">Process</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <a
                href="#contact"
                className="px-4 py-2 border border-white/20 rounded-md hover:bg-white hover:text-black transition"
              >
                Engage
              </a>
            </nav>
          </div>
        </header>

        <main className="pt-16">{children}</main>

        <footer className="border-t border-white/10 py-14 mt-28">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} AVOLIRO</p>
            <p className="mt-2">
              Velano is an AVOLIRO division. Independent execution. Unified standards.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
