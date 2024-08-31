import type { Metadata } from 'next';
import './globals.css';
import ClientWrapper from '@/src/components/ClientWrapper';

export const metadata: Metadata = {
  title: 'Riese Boost',
  description: 'Development by Arthur Riese Correa',
};

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
