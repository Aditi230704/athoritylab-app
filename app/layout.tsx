import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: 'AthorityLab — Build Authority That Unlocks Opportunities',
  description:
    'A founder ecosystem for visibility, authority, and opportunity. Built for the internet-native generation.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <style>{`
          :root {
            --font-display: var(--font-playfair), "Times New Roman", Georgia, serif;
            --font-sans: var(--font-inter), -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            --font-mono: var(--font-jetbrains), ui-monospace, "SF Mono", monospace;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
