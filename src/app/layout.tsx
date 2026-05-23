import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Moving3DBackground from "@/components/Moving3DBackground";
import OptimizedPageTransition from "@/components/OptimizedPageTransition";
import { GlobalLoadingScreen } from "@/components/GlobalLoadingScreen";
import PageRevealWrapper from "@/components/PageRevealWrapper";
import { LoadingProvider } from "@/contexts/LoadingContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AGZUS Technology Solutions (ATS) | Enterprise AI & IT Partner",
  description:
    "AGZUS Technology Solutions (ATS) is a premier AI & IT company in Pondicherry, India. We architect premium next-gen software, cloud, and automated intelligence products.",
  keywords: [
    "AGZUS Technology Solutions",
    "ATS Pondicherry",
    "AI Company India",
    "IT Consultant Puducherry",
    "Enterprise Software",
    "Cloud Solutions",
    "Web Development Pondicherry"
  ],
  authors: [{ name: "AGZUS Technology Solutions" }],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-900 select-none">
        <LoadingProvider>
          {/* Custom cursor, loading intro, & moving 3D background */}
          <CustomCursor />
          <LoadingScreen />
          <GlobalLoadingScreen />
          <Moving3DBackground />
          <OptimizedPageTransition />

          {/* Global floating Navbar */}
          <Navbar />

          {/* Core page routing view with smooth reveal */}
          <main className="flex-grow pt-24 relative z-10">
            <PageRevealWrapper>{children}</PageRevealWrapper>
          </main>

          {/* Global corporate Footer */}
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
