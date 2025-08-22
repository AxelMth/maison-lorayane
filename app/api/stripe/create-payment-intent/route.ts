import { createOrder } from '@/lib/order.service'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY
    if (!apiKey || typeof apiKey !== 'string') {
      console.error('Missing STRIPE_SECRET_KEY')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    const stripe = new Stripe(apiKey, { apiVersion: '2023-10-16' })
    const { amount, currency = 'eur', metadata, order, items } = await request.json()

    const createdOrder = await createOrder(order, items)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({
      orderId: createdOrder.id,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Erreur Stripe:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
