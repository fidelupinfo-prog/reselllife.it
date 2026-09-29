import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/config";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/motion/ScrollProgress";
import RevealObserver from "@/components/motion/RevealObserver";

// ── Fonts autohosted — zero runtime requests to Google ──
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Resellife Academy | Iniziare con il reselling in Italia",
  description:
    "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling. Scarica la guida gratuita.",
  openGraph: {
    title: "Resellife Academy | Iniziare con il reselling in Italia",
    description:
      "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling. Scarica la guida gratuita.",
    url: SITE_URL,
    siteName: "Resellife Academy",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Resellife Academy — inizia con il reselling",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resellife Academy | Iniziare con il reselling in Italia",
    description:
      "Il metodo, i fornitori testati e il Bot Resellife per costruirti un extra mensile con il reselling.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${anton.variable} ${poppins.variable}`}
    >
      <body className="bg-notte text-testo font-poppins antialiased">
        {/* Scroll progress bar — fixed top */}
        <ScrollProgress />
        {/* Reveal observer — activates data-reveal animations */}
        <RevealObserver />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
