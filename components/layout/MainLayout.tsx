import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuraBackground } from '@/components/ui/aura-background';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <AuraBackground className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </AuraBackground>
  );
}
