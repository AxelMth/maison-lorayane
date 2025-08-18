'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

interface Props {
  amount: number
  orderId: string
  onClose?: () => void
}

export default function CheckoutForm({ amount, orderId, onClose }: Props) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Let Stripe append redirect_status automatically when needed
        return_url: `${window.location.origin}/checkout?order_id=${orderId}`,
      },
      redirect: 'if_required',
    })

    if (error) {
      setMessage(error.message || 'Le paiement a échoué.')
    } else {
      setMessage('Paiement confirmé.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {message && (
        <div className={message === 'Paiement confirmé.' ? 'text-sm text-emerald-700' : 'text-sm text-red-600'}>
          {message}
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
        >
          {loading ? 'Traitement...' : `Payer ${amount.toFixed(2)} €`}
        </Button>
        {onClose && (
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  )
}
