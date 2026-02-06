import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.jpg';

export const AgeGate = () => {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [confirmed]);

  return (
    <AnimatePresence>
      {!confirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-strong rounded-3xl p-8 md:p-12 max-w-md mx-4 text-center"
          >
            <img
              src={logo}
              alt="BeerCode"
              className="w-24 h-24 mx-auto mb-6 rounded-xl object-cover"
            />

            <p className="text-foreground/80 leading-relaxed text-sm md:text-base mb-8">
              Сайт содержит информацию, которая не рекомендована лицам, не
              достигшим совершеннолетия. Для входа на сайт, подтвердите свой
              возраст.
            </p>

            <button
              onClick={() => setConfirmed(true)}
              className="w-full py-4 px-8 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl animate-pulse-glow hover:brightness-110 transition-all duration-300 uppercase tracking-wider"
            >
              Подтверждаю
            </button>

            <p className="text-muted-foreground/50 text-xs mt-6">
              Нажимая кнопку, вы подтверждаете, что вам исполнилось 18 лет
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
