import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { createOrder } from '@/lib/order.service'

export async function GET() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        order_items (
          id,
          product_id,
          product_name,
          product_price,
          quantity,
          subtotal
        )
      `,
      )
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur lors de la récupération des commandes:', error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const order = await createOrder(body.order, body.items)
    return NextResponse.json(order)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .update({ status: body.status })
      .eq('id', body.id)
      .select()
      .single()

    if (orderError) {
      console.error('Erreur lors de la mise à jour de la commande:', orderError)
      return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
