import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptForge AI - Enhance Your Prompts',
  description: 'Transform simple ideas into powerful AI prompts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-950 transition-colors duration-300`}>
        {children}
        <Toaster position="bottom-right" richColors theme="system" />
      </body>
    </html>
  );
}
