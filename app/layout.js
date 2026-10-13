import { Geist, Playfair_Display } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Elegant font for headings.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bean There · Coffee Shop",
  description: "Order your coffee online and pick it up at the café. No queue.",
};

export const viewport = {
  themeColor: "#1a120d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        {/* Mobile first: on large screens the content stays centered. */}
        <main className="mx-auto min-h-screen max-w-md px-5 pb-28">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
