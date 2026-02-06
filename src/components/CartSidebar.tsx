import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSidebar = ({ open, onOpenChange }: CartSidebarProps) => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } =
    useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    clearCart();
    setTimeout(() => {
      setShowSuccess(false);
      setShowCheckout(false);
      onOpenChange(false);
      setForm({ name: '', phone: '', address: '' });
    }, 4000);
  };

  const handleClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setShowCheckout(false);
      setShowSuccess(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="bg-card border-border w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-xl text-foreground uppercase tracking-wide">
            {showCheckout ? 'Оформление' : 'Корзина'}
          </SheetTitle>
        </SheetHeader>

        <AnimatePresence mode="wait">
          {showSuccess ? (
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
          ) : showCheckout ? (
            <motion.form
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col gap-4 p-6"
            >
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Имя
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Ваше имя"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Телефон
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="+7 (___) ___-__-__"
                  maxLength={20}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Адрес доставки
                </label>
                <input
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Город, улица, дом"
                  maxLength={200}
                />
              </div>

              <div className="mt-auto space-y-3 pt-4">
                <div className="flex justify-between text-lg font-display font-bold">
                  <span className="text-foreground">Итого:</span>
                  <span className="text-primary">{totalPrice}&nbsp;₽</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl glow-amber hover:brightness-110 transition-all uppercase tracking-wide"
                >
                  Подтвердить заказ
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="w-full py-3 glass rounded-xl text-foreground/60 hover:text-foreground transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад к корзине
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                  <ShoppingBagIcon />
                  <p className="mt-4">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
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

                  <div className="p-4 border-t border-border space-y-3">
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span className="text-foreground">Итого:</span>
                      <span className="text-primary">
                        {totalPrice}&nbsp;₽
                      </span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl glow-amber hover:brightness-110 transition-all uppercase tracking-wide"
                    >
                      Оплатить
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </SheetContent>
    </Sheet>
  );
};

const ShoppingBagIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-muted-foreground/30"
  >
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" x2="21" y1="6" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
