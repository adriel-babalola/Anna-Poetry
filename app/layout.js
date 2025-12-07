import localFont from "next/font/local";
import "./globals.css";

const outfit = localFont({
  src: [
    {
      path: "/fonts/Outfit-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
