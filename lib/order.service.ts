import { type Order, type OrderItem } from './supabase'
import { supabaseAdmin as supabase } from './supabase-admin'

export const createOrder = async (order: Order, items: OrderItem[]) => {
  const { data: createdOrder, error: orderError } = await supabase
    .from('orders')
    .insert([
      {
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        total_amount: order.total_amount,
        status: 'pending',
      },
    ])
    .select()
    .single()

  if (orderError) {
    console.error('Erreur lors de la création de la commande:', orderError)
    throw orderError
  }

  const orderItems = items.map((item: any) => ({
    order_id: createdOrder.id,
    product_id: item.id,
    product_name: item.name,
    product_price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)

  if (itemsError) {
    console.error('Erreur lors de la création des articles de commande:', itemsError)
    throw itemsError
  }

  return createdOrder
}
