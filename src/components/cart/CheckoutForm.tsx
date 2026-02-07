import { useState } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const PICKUP_POINTS = [
  { id: 'kislovodsk', label: 'Кисловодск, ул. Красивая 58' },
  { id: 'essentuki', label: 'Ессентуки, ул. Никольская 20' },
];

interface CheckoutFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const CheckoutForm = ({ onBack, onSuccess }: CheckoutFormProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [pickupPoint, setPickupPoint] = useState(PICKUP_POINTS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationInfo =
    orderType === 'delivery'
      ? form.address
      : PICKUP_POINTS.find((p) => p.id === pickupPoint)?.label ?? '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) return;
    if (orderType === 'delivery' && !form.address.trim()) return;

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-telegram-order', {
        body: {
          customerName: form.name.trim(),
          customerPhone: form.phone.trim(),
          orderType,
          locationInfo,
          items: items.map((i) => ({
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          totalPrice,
        },
      });

      if (error) throw error;

      clearCart();
      setForm({ name: '', phone: '', address: '' });
      onSuccess();
    } catch (err) {
      console.error('Order submission error:', err);
      toast({
        title: 'Ошибка отправки',
        description: 'Пожалуйста, позвоните нам: +79283022242',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all';

  return (
    <motion.form
      key="checkout"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto"
    >
      <div>
        <label className="text-sm text-muted-foreground mb-1.5 block">Имя</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputClass}
          placeholder="Ваше имя"
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
        <input
          required
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className={inputClass}
          placeholder="+7 (___) ___-__-__"
          maxLength={20}
          disabled={isSubmitting}
        />
      </div>

      {/* Delivery / Pickup tabs */}
      <div>
        <label className="text-sm text-muted-foreground mb-1.5 block">Способ получения</label>
        <Tabs
          value={orderType}
          onValueChange={(v) => setOrderType(v as 'delivery' | 'pickup')}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 bg-secondary rounded-xl h-11">
            <TabsTrigger
              value="delivery"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
            >
              🚀 Доставка
            </TabsTrigger>
            <TabsTrigger
              value="pickup"
              className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium transition-all"
            >
              🏪 Самовывоз
            </TabsTrigger>
          </TabsList>

          <TabsContent value="delivery" className="mt-3">
            <input
              required={orderType === 'delivery'}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className={inputClass}
              placeholder="Город, улица, дом"
              maxLength={200}
              disabled={isSubmitting}
            />
          </TabsContent>

          <TabsContent value="pickup" className="mt-3 space-y-2">
            {PICKUP_POINTS.map((point) => (
              <label
                key={point.id}
                className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  pickupPoint === point.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-secondary hover:border-primary/40'
                }`}
              >
                <input
                  type="radio"
                  name="pickup"
                  value={point.id}
                  checked={pickupPoint === point.id}
                  onChange={() => setPickupPoint(point.id)}
                  className="accent-primary"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-foreground">{point.label}</span>
              </label>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-auto space-y-3 pt-4">
        <div className="flex justify-between text-lg font-display font-bold">
          <span className="text-foreground">Итого:</span>
          <span className="text-primary">{totalPrice}&nbsp;₽</span>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-xl glow-amber hover:brightness-110 transition-all uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Отправка...
            </>
          ) : (
            'Заказать'
          )}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full py-3 glass rounded-xl text-foreground/60 hover:text-foreground transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к корзине
        </button>
      </div>
    </motion.form>
  );
};
