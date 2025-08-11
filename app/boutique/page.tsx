"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  active: boolean
}

// Données d'exemple - à remplacer par l'API Supabase
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Baguette Tradition",
    description: "Notre baguette emblématique, croustillante à l'extérieur et moelleuse à l'intérieur",
    price: 1.2,
    image: "/images/french-baguette.png",
    category: "Pains",
    active: true,
  },
  {
    id: "2",
    name: "Croissant au Beurre",
    description: "Croissant feuilleté au beurre français, cuit chaque matin",
    price: 1.5,
    image: "/images/french-butter-croissant.png",
    category: "Viennoiseries",
    active: true,
  },
  {
    id: "3",
    name: "Pain au Chocolat",
    description: "Viennoiserie feuilletée avec deux barres de chocolat noir",
    price: 1.6,
    image: "/images/placeholder-uk4bv.jpg",
    category: "Viennoiseries",
    active: true,
  },
  {
    id: "4",
    name: "Tarte aux Fruits",
    description: "Tarte saisonnière aux fruits frais sur pâte sablée",
    price: 18.0,
    image: "/images/french-fruit-tart.png",
    category: "Pâtisseries",
    active: true,
  },
  {
    id: "5",
    name: "Éclair au Chocolat",
    description: "Pâte à choux garnie de crème pâtissière et glaçage chocolat",
    price: 3.5,
    image: "/images/french-chocolate-eclair.png",
    category: "Pâtisseries",
    active: true,
  },
  {
    id: "6",
    name: "Pain de Campagne",
    description: "Pain rustique au levain, parfait pour accompagner vos repas",
    price: 2.8,
    image: "/images/placeholder-97aus.jpg",
    category: "Pains",
    active: true,
  },
]

export default function BoutiquePage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous")

  const categories = ["Tous", "Pains", "Viennoiseries", "Pâtisseries"]

  const filteredProducts =
    selectedCategory === "Tous"
      ? products.filter((p) => p.active)
      : products.filter((p) => p.active && p.category === selectedCategory)

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
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
      const product = products.find((p) => p.id === productId)
      return sum + (product ? product.price * count : 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-primary text-primary-foreground shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/images/maison-lorayane.jpg"
                alt="Maison L'Orayane"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="ml-3 text-xl font-bold text-amber-800">Maison L'Orayane</span>
            </div>
            <div className="flex items-center">
              <div className="ml-10 flex items-baseline space-x-4 hidden md:block">
                <Link href="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link
                  href="/histoire"
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notre Histoire
                </Link>
                <Link
                  href="/boutique"
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Boutique
                </Link>
                <Link
                  href="/admin"
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Admin
                </Link>
              </div>
              <Button variant="outline" className="relative bg-transparent">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notre Boutique</h1>
          <p className="text-xl text-gray-600">Découvrez nos produits artisanaux préparés avec passion</p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
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
                <Button className="bg-amber-600 hover:bg-amber-700">Passer commande</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grille des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-amber-600">{product.category}</Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-amber-600">{product.price.toFixed(2)} €</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
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
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => addToCart(product.id)}>
                    Ajouter au panier
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit disponible dans cette catégorie pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
