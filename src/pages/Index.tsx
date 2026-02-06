import { useState } from 'react';
import { AgeGate } from '@/components/AgeGate';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CatalogSection } from '@/components/CatalogSection';
import { CartSidebar } from '@/components/CartSidebar';
import { MapSection } from '@/components/MapSection';
import { FooterSection } from '@/components/FooterSection';

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AgeGate />
      <Header onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <CatalogSection />
        <MapSection />
      </main>
      <FooterSection />
      <CartSidebar open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;
