import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderSuccess = () => (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="flex-1 flex flex-col items-center justify-center text-center p-8"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 0.2 }}
    >
      <CheckCircle className="w-20 h-20 text-primary mb-6" />
    </motion.div>
    <h3 className="font-display text-2xl font-bold text-foreground mb-3 uppercase">
      Заказ принят!
    </h3>
    <p className="text-muted-foreground leading-relaxed">
      Данные отправлены менеджеру в{' '}
      <a
        href="https://t.me/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Telegram
      </a>
      . Мы скоро свяжемся с&nbsp;вами.
    </p>
  </motion.div>
);
