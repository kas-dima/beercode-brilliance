import { Check, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);

  const handleAdd = () => {
    if (!inCart) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-500">
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/90 text-primary-foreground rounded-full">
            {product.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-4 -mt-6 relative">
        <h3 className="font-display font-semibold text-foreground text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-display font-bold text-primary">
            {product.price}&nbsp;₽
          </span>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
              inCart
                ? 'bg-primary/15 text-primary border border-primary/25'
                : 'bg-primary text-primary-foreground hover:brightness-110 glow-amber-sm'
            }`}
          >
            {inCart ? (
              <>
                <Check className="w-4 h-4" />
                <span>Добавлено</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>В корзину</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};
