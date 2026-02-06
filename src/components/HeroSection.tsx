import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useMemo } from 'react';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 16 + 6,
        duration: Math.random() * 10 + 6,
        delay: Math.random() * 8,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="bubble"
            style={{
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 uppercase tracking-tight leading-[0.9]">
            <span className="text-primary">BeerCode</span>
            <br />
            <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Территория честного пива
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
        >
          Более 100 кранов. 300 сортов. Свежайшие снеки и&nbsp;всё для&nbsp;бани.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <button
            onClick={() =>
              document
                .getElementById('catalog')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-10 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl glow-amber hover:brightness-110 hover:scale-105 transition-all duration-300 uppercase tracking-wider"
          >
            Смотреть ассортимент
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};
