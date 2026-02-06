import { useState, useEffect } from 'react';
import { ShoppingCart, Phone, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.jpg';

interface HeaderProps {
  onCartOpen: () => void;
}

export const Header = ({ onCartOpen }: HeaderProps) => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <img
          src={logo}
          alt="BeerCode"
          className="h-10 md:h-14 w-auto object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        />

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Ассортимент', id: 'catalog' },
            { label: 'Магазины', id: 'stores' },
            { label: 'Контакты', id: 'contacts' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-foreground/70 hover:text-primary transition-colors duration-300 font-medium text-sm uppercase tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="tel:+79283022242"
            className="hidden lg:flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors duration-300"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">+7 928 302-22-42</span>
          </a>

          <button
            onClick={onCartOpen}
            className="relative p-2.5 rounded-xl hover:bg-secondary transition-colors duration-300 group"
          >
            <ShoppingCart className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {[
                { label: 'Ассортимент', id: 'catalog' },
                { label: 'Магазины', id: 'stores' },
                { label: 'Контакты', id: 'contacts' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left py-3 px-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-all font-medium"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="tel:+79283022242"
                className="flex items-center gap-2 py-3 px-3 rounded-xl text-primary font-medium"
              >
                <Phone className="w-4 h-4" />
                +7 928 302-22-42
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
