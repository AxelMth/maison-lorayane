"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Eye, Package, ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  active: boolean
  startDate: string
  endDate: string
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: { productId: string; productName: string; quantity: number; price: number }[]
  total: number
  status: string
  date: string
}

// Données d'exemple
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Baguette Tradition",
    description: "Notre baguette emblématique",
    price: 1.2,
    image: "/french-baguette.png",
    category: "Pains",
    active: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: "2",
    name: "Croissant au Beurre",
    description: "Croissant feuilleté au beurre français",
    price: 1.5,
    image: "/placeholder.svg?height=200&width=300",
    category: "Viennoiseries",
    active: true,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
]

const sampleOrders: Order[] = [
  {
    id: "1",
    customerName: "Marie Dubois",
    customerEmail: "marie.dubois@email.com",
    items: [
      { productId: "1", productName: "Baguette Tradition", quantity: 2, price: 1.2 },
      { productId: "2", productName: "Croissant au Beurre", quantity: 3, price: 1.5 },
    ],
    total: 6.9,
    status: "En préparation",
    date: "2024-01-15",
  },
]

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [orders, setOrders] = useState<Order[]>(sampleOrders)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    startDate: "",
    endDate: "",
    image: "",
  })

  const handleLogin = () => {
    // Mot de passe simple pour la démo - à remplacer par une vraie authentification
    if (password === "admin123") {
      setIsAuthenticated(true)
    } else {
      alert("Mot de passe incorrect")
    }
  }

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      active: true,
      image: newProduct.image || "/placeholder.svg?height=200&width=300",
    }
    setProducts([...products, product])
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      category: "",
      startDate: "",
      endDate: "",
      image: "",
    })
    setIsAddingProduct(false)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const toggleProductStatus = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, active: !p.active } : p)))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Administration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-amber-600 hover:bg-amber-700">
              Se connecter
            </Button>
            <div className="text-center">
              <Link href="/" className="text-sm text-gray-600 hover:text-amber-600">
                Retour au site
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Admin */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/logo-maison-lorayane.png"
                alt="Maison L'Orayane"
                width={60}
                height={60}
                className="rounded-full"
              />
              <span className="ml-3 text-xl font-bold text-amber-800">Admin - Maison L'Orayane</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-amber-600">
                Voir le site
              </Link>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Gérez vos produits et commandes</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-amber-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Produits actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter((p) => p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Commandes</p>
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chiffre d'affaires</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} €
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Produits inactifs</p>
                  <p className="text-2xl font-bold text-gray-900">{products.filter((p) => !p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestion des produits</h2>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un produit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouveau produit</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Prix (€)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pains">Pains</SelectItem>
                          <SelectItem value="Viennoiseries">Viennoiseries</SelectItem>
                          <SelectItem value="Pâtisseries">Pâtisseries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Date de début</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newProduct.startDate}
                          onChange={(e) => setNewProduct({ ...newProduct, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newProduct.endDate}
                          onChange={(e) => setNewProduct({ ...newProduct, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="image">URL de l'image (optionnel)</Label>
                      <Input
                        id="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        placeholder="https://exemple.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddProduct} className="bg-amber-600 hover:bg-amber-700">
                      Ajouter le produit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={product.active ? "default" : "secondary"}>
                              {product.active ? "Actif" : "Inactif"}
                            </Badge>
                            <Badge variant="outline">{product.category}</Badge>
                            <span className="text-lg font-bold text-amber-600">{product.price.toFixed(2)} €</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Disponible du {product.startDate} au {product.endDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => toggleProductStatus(product.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Gestion des commandes</h2>

            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">Commande #{order.id}</h3>
                        <p className="text-gray-600">
                          {order.customerName} - {order.customerEmail}
                        </p>
                        <p className="text-sm text-gray-500">Date: {order.date}</p>
                        <div className="mt-2">
                          <Badge className="bg-blue-100 text-blue-800">{order.status}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">{order.total.toFixed(2)} €</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Articles commandés:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.productName} x{item.quantity}
                            </span>
                            <span>{(item.price * item.quantity).toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
