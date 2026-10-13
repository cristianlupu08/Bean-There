import { Geist, Playfair_Display } from "next/font/google";
import BottomNav from "@/components/BottomNav";
import SideDecor from "@/components/SideDecor";
import TopNav from "@/components/TopNav";
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
  // How the app looks when added to an iPhone home screen.
  appleWebApp: {
    capable: true,
    title: "Bean There",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#0e1915",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <SideDecor />
        <TopNav />
        {/* Mobile first: a narrow column on phones, a wide layout on computers. */}
        <main className="relative z-10 mx-auto min-h-screen max-w-md px-5 pb-28 md:max-w-6xl md:px-8 md:pb-20">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
