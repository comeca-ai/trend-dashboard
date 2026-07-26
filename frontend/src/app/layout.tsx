import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Trend Dashboard',
  description: 'Análise de tendências do Google Trends com IA',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-dark text-light">
        {children}
      </body>
    </html>
  );
}
