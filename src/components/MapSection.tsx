import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const stores = [
  {
    name: 'BeerCode Кисловодск',
    address: 'ул. Красивая 58, Кисловодск',
    phone: '+79283022242',
    phoneFormatted: '+7 928 302-22-42',
    hours: 'Ежедневно: 10:00 — 22:00',
    mapLink:
      'https://yandex.ru/maps/?text=Кисловодск+ул+Красивая+58',
  },
  {
    name: 'BeerCode Ессентуки',
    address: 'ул. Никольская 20, Ессентуки',
    phone: '+79283022242',
    phoneFormatted: '+7 928 302-22-42',
    hours: 'Ежедневно: 10:00 — 22:00',
    mapLink:
      'https://yandex.ru/maps/?text=Ессентуки+ул+Никольская+20',
  },
];

export const MapSection = () => {
  return (
    <section id="stores" className="py-20 md:py-32 relative">
      {/* Subtle amber gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 uppercase tracking-tight">
            Наши точки
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Ждём вас в наших магазинах
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {stores.map((store, i) => (
            <motion.div
              key={store.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-500 group"
            >
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-6 uppercase tracking-wide">
                {store.name}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{store.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground/80">{store.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground/80">
                    {store.phoneFormatted}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href={`tel:${store.phone}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-xl hover:brightness-110 glow-amber-sm transition-all uppercase tracking-wide text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Позвонить
                </a>
                <a
                  href={store.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 glass rounded-xl text-foreground/60 hover:text-primary hover:border-primary/20 transition-all text-sm font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  На карте
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
