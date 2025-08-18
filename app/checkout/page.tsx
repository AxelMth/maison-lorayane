// app/checkout/page.tsx
"use client"

import { useSearchParams } from "next/navigation"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "@/components/checkout-form"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const params = useSearchParams()
  const clientSecret = params.get("cs")
  const amountParam = params.get("amount")
  const redirectStatus = params.get("redirect_status")
  const amount = amountParam ? parseFloat(amountParam) : 0

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-700">Aucun paiement à traiter. Retour à la boutique.</p>
        </div>
      </div>
    )
  }

  if (redirectStatus === "succeeded") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-700">Paiement réussi. Merci pour votre commande.</p>
        </div>
      </div>
    )
  }

  if (redirectStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-700">Paiement échoué. Veuillez réessayer.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe" }, locale: "fr" }}
        >
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  )
}