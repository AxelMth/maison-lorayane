import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          id,
          product_id,
          product_name,
          product_price,
          quantity,
          subtotal
        )
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erreur lors de la récupération des commandes:", error)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Créer la commande
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: body.customer_name,
          customer_email: body.customer_email,
          customer_phone: body.customer_phone,
          total_amount: body.total_amount,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (orderError) {
      console.error("Erreur lors de la création de la commande:", orderError)
      return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 })
    }

    // Créer les articles de commande
    const orderItems = body.items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      product_price: item.product_price,
      quantity: item.quantity,
      subtotal: item.product_price * item.quantity,
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      console.error("Erreur lors de la création des articles:", itemsError)
      return NextResponse.json({ error: "Erreur lors de la création des articles" }, { status: 500 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
