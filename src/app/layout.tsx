
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Project Forge | Build Your Own Project',
  description: 'A platform for microcontroller and minicomputer enthusiasts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster />
          <footer className="border-t py-8 bg-card mt-12">
            <div className="container mx-auto px-4 text-center text-muted-foreground text-sm space-y-2">
              <p>&copy; 2026 Project Forge. Empowering Makers Everywhere.</p>
              <p className="font-medium text-primary">Made by Rudra Biloriya</p>
            </div>
          </footer>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
