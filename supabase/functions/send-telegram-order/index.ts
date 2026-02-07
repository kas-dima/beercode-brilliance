import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderPayload {
  customerName: string;
  customerPhone: string;
  orderType: "delivery" | "pickup";
  locationInfo: string;
  items: OrderItem[];
  totalPrice: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    if (!BOT_TOKEN) {
      throw new Error("TELEGRAM_BOT_TOKEN is not configured");
    }

    const CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
    if (!CHAT_ID) {
      throw new Error("TELEGRAM_CHAT_ID is not configured");
    }

    const payload: OrderPayload = await req.json();

    const { customerName, customerPhone, orderType, locationInfo, items, totalPrice } = payload;

    if (!customerName || !customerPhone || !orderType || !locationInfo || !items?.length) {
      return new Response(
        JSON.stringify({ error: "Все поля обязательны для заполнения" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const itemsFormatted = items
      .map((item, i) => `  ${i + 1}. ${item.name} × ${item.quantity} — ${item.price * item.quantity} руб.`)
      .join("\n");

    const typeLabel = orderType === "delivery" ? "🚀 ДОСТАВКА" : "🏪 САМОВЫВОЗ";

    const text = `🍺 <b>НОВЫЙ ЗАКАЗ: BeerCode</b>

━━━━━━━━━━━━━━━━━━

👤 <b>Клиент:</b> ${customerName}
📞 <b>Телефон:</b> ${customerPhone}
🚚 <b>Тип:</b> ${typeLabel}
📍 <b>Куда/Точка:</b> ${locationInfo}

🛒 <b>ТОВАРЫ:</b>
${itemsFormatted}

💰 <b>ИТОГО:</b> ${totalPrice} руб.

━━━━━━━━━━━━━━━━━━
✅ <i>Срочно свяжитесь с клиентом!</i>`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });

    const tgData = await tgResponse.json();

    if (!tgResponse.ok) {
      console.error("Telegram API error:", tgData);
      throw new Error(`Telegram API error [${tgResponse.status}]: ${JSON.stringify(tgData)}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error sending Telegram message:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
