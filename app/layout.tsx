import { dark } from '@clerk/themes'
import type { Metadata } from "next";
import { ToastContainer, Zoom } from 'react-toastify';
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations';
import "@/styles/globals.css";

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
