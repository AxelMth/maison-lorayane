'use client'

import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '@/components/checkout-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, CheckCircle2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const router = useRouter()
  const params = useSearchParams()
  const clientSecret = params.get('cs')
  const amountParam = params.get('amount')
  const amount = amountParam ? parseFloat(amountParam) : 0
  const status = params.get('redirect_status') || params.get('status')
  const orderId = params.get('order_id') || ''

  useEffect(() => {
    if (status === 'succeeded' || status === 'paid') {
      fetch('/api/orders', {
        method: 'PATCH',
        body: JSON.stringify({
          id: orderId,
          status: 'paid',
        }),
      })
    }
  }, [status, router, orderId])

  if (status === 'succeeded' || status === 'paid') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Paiement réussi</h2>
          <p className="text-gray-600 mb-6">Merci pour votre commande. Un email de confirmation vous a été envoyé.</p>
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => router.push('/')}
              className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
            >
              Retour à la boutique
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Paiement échoué</h2>
          <p className="text-gray-600 mb-6">
            Une erreur est survenue. Veuillez réessayer ou utiliser un autre moyen de paiement.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={() => router.push('/')}
              className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
            >
              Retour à la boutique
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Aucun paiement à traiter</CardTitle>
              <CardDescription>Revenez à la boutique pour choisir vos produits.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer">
                <a href="/boutique">Retour à la boutique</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const appearance = {
    theme: 'flat' as const,
    variables: {
      colorPrimary: '#d97706',
      colorBackground: '#ffffff',
      colorText: '#111827',
      borderRadius: '12px',
      fontFamily:
        '"Geist", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Paiement sécurisé</CardTitle>
            <CardDescription>Montant: {amount.toFixed(2)} €</CardDescription>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise} options={{ clientSecret, appearance, locale: 'fr' }}>
              <CheckoutForm amount={amount} orderId={orderId} />
            </Elements>
            <div className="mt-4 flex items-center text-xs text-gray-500">
              <Lock className="h-4 w-4 mr-2" />
              Transactions chiffrées et sécurisées par Stripe
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
