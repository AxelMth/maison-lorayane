'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Minus } from 'lucide-react'
import Nav from '@/components/nav'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  active: boolean
}

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/products', { cache: 'no-store' })
        if (!res.ok) throw new Error('Erreur lors du chargement des produits')
        const data = await res.json()
        const mapped: Product[] = (data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
          image: p.image_url || '/placeholder.svg',
          category: p.category,
          active: !!p.active,
        }))
        setProducts(mapped)
      } catch (e) {
        console.error(e)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = ['Tous', 'Pains', 'Viennoiseries', 'Pâtisseries']

  const filteredProducts =
    selectedCategory === 'Tous'
      ? products.filter(p => p.active)
      : products.filter(p => p.active && p.category === selectedCategory)

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = { ...prev }
      if (newCart[productId] > 1) {
        newCart[productId]--
      } else {
        delete newCart[productId]
      }
      return newCart
    })
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [productId, count]) => {
      const product = products.find(p => p.id === productId)
      return sum + (product ? product.price * count : 0)
    }, 0)
  }

  const handleCheckout = async () => {
    const items = Object.entries(cart).map(([productId, qty]) => {
      const product = products.find(p => p.id === productId)
      return {
        id: productId,
        name: product?.name || '',
        quantity: qty,
        price: product?.price ?? 0,
      }
    })

    const res = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: getTotalPrice(),
        currency: 'eur',
        order: {
          // TODO: get customer name and email from user
          customer_name: 'John Doe',
          customer_email: 'john.doe@example.com',
          customer_phone: '1234567890',
          total_amount: getTotalPrice(),
        },
        items: items,
      }),
    })

    if (!res.ok) {
      console.error('Erreur lors de la création du PaymentIntent')
      return
    }

    const data = await res.json()
    const amount = getTotalPrice()
    router.push(
      `/checkout?cs=${encodeURIComponent(data.clientSecret)}&amount=${encodeURIComponent(String(amount))}&order_id=${
        data.orderId
      }`,
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notre Boutique</h1>
          <p className="text-xl text-gray-600">Découvrez nos produits artisanaux préparés avec passion</p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer'
                    : 'hover:cursor-pointer hover:bg-amber-600 hover:text-white'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Panier résumé */}
        {getTotalItems() > 0 && (
          <Card className="mb-8 bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold">Panier: {getTotalItems()} article(s)</span>
                  <span className="ml-4 text-lg font-bold text-amber-600">{getTotalPrice().toFixed(2)} €</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
                >
                  Passer commande
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grille des produits */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={`skeleton-${i}`} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video bg-gray-200 animate-pulse relative" />
                <CardContent className="p-4 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                  <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                <div className="aspect-video relative">
                  <Image src={product.image || '/placeholder.svg'} alt={product.name} fill className="object-cover" />
                  <Badge className="absolute top-2 right-2 bg-amber-600 text-white">{product.category}</Badge>
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-amber-600">{product.price.toFixed(2)} €</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                  {cart[product.id] ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => removeFromCart(product.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold">{cart[product.id]}</span>
                        <Button size="sm" variant="outline" onClick={() => addToCart(product.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="font-semibold text-amber-600">
                        {(product.price * cart[product.id]).toFixed(2)} €
                      </span>
                    </div>
                  ) : (
                    <Button
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
                      onClick={() => addToCart(product.id)}
                    >
                      Ajouter au panier
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit disponible dans cette catégorie pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
