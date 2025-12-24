import localFont from "next/font/local";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const lora = localFont({
  src: [
    {
      path: "/fonts/Lora-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lora",
});

const courier = localFont({
  src: [
    {
      path: "/fonts/CourierPrime-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-courier",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${courier.variable}`}>
      <title>The Realest Poet</title>
      <body className="antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
