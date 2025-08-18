import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types pour TypeScript
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  active: boolean
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  total_amount: number
  status: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  subtotal: number
  created_at: string
}
