import { NextResponse } from "next/server";
import type { Order } from "@/types";
import { createSupabaseOrder } from "@/lib/repositories/supabase-repositories";

export async function POST(request: Request) {
  // ✅ FIX: check env trực tiếp (KHÔNG dùng hasSupabaseConfig)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const order = (await request.json()) as Order;

  if (!order.id || !order.customerEmail || !order.items?.length) {
    return NextResponse.json(
      { error: "Invalid order" },
      { status: 400 }
    );
  }

  try {
    const created = await createSupabaseOrder(order);

    return NextResponse.json(
      { order: created },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Order create failed",
      },
      { status: 500 }
    );
  }
}