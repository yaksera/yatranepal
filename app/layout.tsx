import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yatra Nepal — A little closer to extraordinary",
  description: "Find your own Nepal. Discover Himalayan trails, quiet lakes and living heritage, then create a personal journey outline.",
};

export const viewport: Viewport = { themeColor: "#172823" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
