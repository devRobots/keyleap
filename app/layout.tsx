import "@/styles/globals.css";
import { dark } from '@clerk/themes'
import type { Metadata } from "next";
import { esES } from '@clerk/localizations';

import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from "@vercel/analytics/next"
import { ToastContainer, Zoom } from 'react-toastify';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "KeyLeap",
  description: "Encuentra la clave. Da el salto. Descubre el camino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES} appearance={{
      baseTheme: dark
    }}>
      <html lang="es">
        <Analytics />
        <SpeedInsights />
        <body className="h-screen w-screen antialiased">
          {children}
          <ToastContainer position="bottom-center"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="colored"
            transition={Zoom}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
