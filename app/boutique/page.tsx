'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Nav from '@/components/nav'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  active: boolean
}

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous')
  const [loading, setLoading] = useState(true)

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

        {/* Grille des produits */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={`skeleton-${i}`} className="overflow-hidden flex flex-col h-full">
                <div className="aspect-video bg-gray-200 animate-pulse relative" />
                <CardContent className="p-4 flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
                </CardContent>
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
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </CardContent>
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
