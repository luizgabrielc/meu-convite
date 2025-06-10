import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Convite de 2 anos de Maria Cecília",
  description: "Celebre conosco o 2º aniversário da Maria Cecília! Confirme sua presença neste dia especial cheio de alegria, brincadeiras e doces. Um momento mágico para guardar no coração.",
  openGraph: {
    title: "Convite Especial: 2 anos da Maria Cecília!",
    description: "Você está convidado para a festa de 2 anos da Maria Cecília. Um dia de magia e diversão para celebrar essa data tão especial!",
    images: [{
      url: "/convite-aniversario-maria-cecilia.svg",
      width: 1200,
      height: 630,
      alt: "Convite de Aniversário da Maria Cecília",
    }]
  },
  keywords: ["aniversário infantil", "festa 2 anos", "convite online", "Maria Cecília", "confirmação presença"],
  authors: [{ name: "Família Martins Araujo" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
