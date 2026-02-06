import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { products, categories } from '@/data/products';

export const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalog" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 uppercase tracking-tight">
            Ассортимент
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Только лучшее разливное пиво и закуски
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {[{ key: 'all', label: 'Все' }, ...categories].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground glow-amber-sm'
                  : 'glass text-foreground/60 hover:text-foreground hover:border-primary/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
