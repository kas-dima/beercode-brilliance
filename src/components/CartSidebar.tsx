import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { AnimatePresence, motion } from 'framer-motion';
import { CartItemList } from '@/components/cart/CartItemList';
import { CheckoutForm } from '@/components/cart/CheckoutForm';
import { OrderSuccess } from '@/components/cart/OrderSuccess';

interface CartSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartSidebar = ({ open, onOpenChange }: CartSidebarProps) => {
  const { items, totalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setShowCheckout(false);
      onOpenChange(false);
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
            <OrderSuccess key="success" />
          ) : showCheckout ? (
            <CheckoutForm
              key="checkout"
              onBack={() => setShowCheckout(false)}
              onSuccess={handleSuccess}
            />
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden"
            >
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8">
                  <ShoppingBagIcon />
                  <p className="mt-4">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <CartItemList />
                  <div className="p-4 border-t border-border space-y-3">
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span className="text-foreground">Итого:</span>
                      <span className="text-primary">{totalPrice}&nbsp;₽</span>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl glow-amber hover:brightness-110 transition-all uppercase tracking-wide"
                    >
                      Оформить заказ
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
