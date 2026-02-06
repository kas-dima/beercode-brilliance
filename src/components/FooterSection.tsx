import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpg';

export const FooterSection = () => {
  return (
    <footer id="contacts" className="border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="BeerCode"
              className="h-12 w-auto object-contain"
            />
            <div>
              <h3 className="font-display text-lg font-bold text-primary uppercase tracking-wide">
                BeerCode
              </h3>
              <p className="text-muted-foreground text-sm">
                Магазин разливного пенного
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://vk.ru/club211318315"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 glass rounded-full flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-300 font-bold text-sm"
            >
              VK
            </a>
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 glass rounded-full flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-300 font-bold text-sm"
            >
              TG
            </a>
          </div>
        </motion.div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center space-y-2">
          <p className="text-xs text-muted-foreground/50 leading-relaxed max-w-xl mx-auto">
            Чрезмерное употребление алкоголя вредит вашему здоровью. Продажа
            алкогольной продукции лицам младше 18 лет запрещена.
          </p>
          <p className="text-xs text-muted-foreground/30">
            © {new Date().getFullYear()} BeerCode. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
