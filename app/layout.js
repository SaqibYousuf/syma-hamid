import { Cormorant_Garamond, Urbanist } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/constants/navbar";
import Footer from "../components/constants/footer";
import HideOnAdmin from "../components/constants/hide-on-admin";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const avenirNextW1G = localFont({
  src: [
    {
      path: "./font/Avenir Next W1G Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Thin Italic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G UltraLight Italic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Light Italic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G  Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Medium Italic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Demi.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Demi Italic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./font/Avenir Next W1G Heavy.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./font/Avenir Next W1G Heavy Italic.ttf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-avenir",
});

export const metadata = {
  title: {
    default: "Dr. Syma Hamid | Psychologist & NLP Expert",
    template: "%s | Dr. Syma Hamid",
  },
  description:
    "Psychological support, powerful tools and a compassionate space to help you understand yourself, break unhelpful patterns and create a more fulfilling life.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${urbanist.variable} ${avenirNextW1G.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-x-clip">{children}</div>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
      </body>
    </html>
  );
}
