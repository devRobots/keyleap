import { dark } from '@clerk/themes'
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "KeyLeap",
  description: "Find the key. Make the leap. Uncover the path.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>
      <html lang="es">
        <body className="h-screen w-screen antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
