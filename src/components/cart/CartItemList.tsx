import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const CartItemList = () => {
  const { items, updateQuantity, removeItem } = useCart();

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">
      {items.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="glass rounded-xl p-3 flex gap-3"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate">
              {item.name}
            </h4>
            <p className="text-sm text-primary font-display font-bold">
              {item.price}&nbsp;₽
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-6 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center hover:bg-destructive/20 hover:text-destructive transition-colors text-muted-foreground"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
