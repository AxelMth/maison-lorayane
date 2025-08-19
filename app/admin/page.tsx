'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit, Trash2, Eye, Package, ShoppingCart, Loader2, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    startDate: '',
    endDate: '',
  })

  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null)
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthenticated) return

    const load = async () => {
      setIsLoading(true)
      try {
        const [prodRes, ordRes] = await Promise.all([
          fetch('/api/products?all=1', { cache: 'no-store' }),
          fetch('/api/orders', { cache: 'no-store' }),
        ])
        if (!prodRes.ok) throw new Error('Produits: échec du chargement')
        if (!ordRes.ok) throw new Error('Commandes: échec du chargement')

        const [prodData, ordData] = await Promise.all([prodRes.json(), ordRes.json()])

        const mappedProducts: Product[] = (prodData || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          description: p.description || '',
          price: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
          image: p.image_url || '/placeholder.svg',
          category: p.category,
          active: !!p.active,
          startDate: p.start_date || '',
          endDate: p.end_date || '',
        }))

        const mappedOrders: Order[] = (ordData || []).map((o: any) => ({
          id: o.id,
          customerName: o.customer_name,
          customerEmail: o.customer_email,
          items: (o.order_items || []).map((oi: any) => ({
            productId: oi.product_id || '',
            productName: oi.product_name,
            quantity: oi.quantity,
            price: typeof oi.product_price === 'string' ? parseFloat(oi.product_price) : oi.product_price,
          })),
          total: typeof o.total_amount === 'string' ? parseFloat(o.total_amount) : o.total_amount,
          status: o.status,
          date: o.created_at ? new Date(o.created_at).toISOString().split('T')[0] : '',
        }))

        setProducts(mappedProducts)
        setOrders(mappedOrders)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [isAuthenticated])

  const handleAddProduct = async () => {
    try {
      setIsCreating(true)
  
      let imageUrl = '/placeholder.svg?height=200&width=300';
      if (newImageFile) {
        imageUrl = await uploadProductImage(newImageFile, newProduct.name || 'produit')
      }
  
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          price: newProduct.price,
          category: newProduct.category,
          start_date: newProduct.startDate,
          end_date: newProduct.endDate,
          image_url: imageUrl,
        }),
      })
      if (!res.ok) throw new Error('Échec de la création')
      const created = await res.json()
      const mapped: Product = {
        id: created.id,
        name: created.name,
        description: created.description || '',
        price: typeof created.price === 'string' ? parseFloat(created.price) : created.price,
        image: created.image_url || '/placeholder.svg',
        category: created.category,
        active: !!created.active,
        startDate: created.start_date || '',
        endDate: created.end_date || '',
      }
      setProducts(prev => [...prev, mapped])
      setNewProduct({ name: '', description: '', price: 0, category: '', startDate: '', endDate: '' })
      if (newImagePreview) URL.revokeObjectURL(newImagePreview)
      setNewImageFile(null)
      setNewImagePreview(null)
      setIsAddingProduct(false)
    } catch (e) {
      console.error(e)
      alert('Erreur lors de la création du produit')
    } finally {
      setIsCreating(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return
    try {
      setIsUpdating(true)

      let imageUrl = editingProduct.image
      if (editImageFile) {
        imageUrl = await uploadProductImage(editImageFile, editingProduct.name || 'produit')
      }

      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          category: editingProduct.category,
          start_date: editingProduct.startDate,
          end_date: editingProduct.endDate,
          image_url: imageUrl,
          active: editingProduct.active,
        }),
      })
      if (!res.ok) throw new Error('Échec de la mise à jour')
      const updated = await res.json()
      const mapped: Product = {
        id: updated.id,
        name: updated.name,
        description: updated.description || '',
        price: typeof updated.price === 'string' ? parseFloat(updated.price) : updated.price,
        image: updated.image_url || '/placeholder.svg',
        category: updated.category,
        active: !!updated.active,
        startDate: updated.start_date || '',
        endDate: updated.end_date || '',
      }
      setProducts(prev => prev.map(p => (p.id === mapped.id ? mapped : p)))
      setEditingProduct(null)
      if (editImagePreview) URL.revokeObjectURL(editImagePreview)
      setEditImageFile(null)
      setEditImagePreview(null)
    } catch (e) {
      console.error(e)
      alert('Erreur lors de la mise à jour du produit')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogin = () => {
    // Mot de passe simple pour la démo - à remplacer par une vraie authentification
    if (
      password ===
      'agGt%tTEKe8X9y*yamm5bn5uah*BSPm@LsrgiQAg*JkdsSXnuYZ!fLf5ZnMvDBzp3Ttt^9uWe3SLz!h9auXw8K#*t*k2si523G$J'
    ) {
      setIsAuthenticated(true)
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const previous = products
    setProducts(products.filter(p => p.id !== id))
    try {
      setDeletingId(id)
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Échec de la suppression')
    } catch (e) {
      console.error(e)
      setProducts(previous)
      alert('Erreur lors de la suppression du produit')
    } finally {
      setDeletingId(null)
    }
  }

  const toggleProductStatus = async (id: string) => {
    const current = products.find(p => p.id === id)
    if (!current) return
    const nextActive = !current.active
    setProducts(products.map(p => (p.id === id ? { ...p, active: nextActive } : p)))
    try {
      setTogglingId(id)
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: nextActive }),
      })
      if (!res.ok) throw new Error('Échec de la mise à jour du statut')
    } catch (e) {
      console.error(e)
      setProducts(products.map(p => (p.id === id ? { ...p, active: !nextActive } : p)))
      alert('Erreur lors de la mise à jour du statut')
    } finally {
      setTogglingId(null)
    }
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
                onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
            >
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

  const mapOrderStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'paid':
        return 'Payé'
      default:
        return status
    }
  }

  const mapOrderStatusColor = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Admin */}
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
              <span className="ml-3 text-xl font-bold text-primary-foreground">Admin - Maison L'Orayane</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="hover:opacity-90">
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
                  <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ShoppingCart className="h-8 w-8 text-green-600 hover:cursor-pointer" />
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
                  <p className="text-2xl font-bold text-gray-900">{products.filter(p => !p.active).length}</p>
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
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer text-white hover:cursor-pointer">
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
                          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Prix (€)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={e => setNewProduct({ ...newProduct, price: Number.parseFloat(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie</Label>
                      <Select onValueChange={value => setNewProduct({ ...newProduct, category: value })}>
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
                          onChange={e => setNewProduct({ ...newProduct, startDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newProduct.endDate}
                          onChange={e => setNewProduct({ ...newProduct, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 items-end">
                      <div>
                        <Label htmlFor="imageFile">Téléverser une image</Label>
                        <Input
                          id="imageFile"
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files?.[0] || null
                            if (newImagePreview) URL.revokeObjectURL(newImagePreview)
                            setNewImageFile(file)
                            setNewImagePreview(file ? URL.createObjectURL(file) : null)
                          }}
                        />
                      </div>
                      <div className="justify-self-end">
                        {newImagePreview && (
                          <Image
                            src={newImagePreview}
                            alt={newProduct.name || 'prévisualisation'}
                            width={120}
                            height={120}
                            className="rounded object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingProduct(false)}
                      className="hover:cursor-pointer"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleAddProduct}
                      disabled={isCreating}
                      className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
                    >
                      {isCreating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Ajouter le produit
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={!!editingProduct} onOpenChange={open => {
                if (!open) {
                  if (editImagePreview) URL.revokeObjectURL(editImagePreview)
                  setEditingProduct(null)
                  setEditImageFile(null)
                  setEditImagePreview(null)
                }
              }}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Modifier le produit</DialogTitle>
                  </DialogHeader>
                  {editingProduct && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-name">Nom du produit</Label>
                          <Input
                            id="edit-name"
                            value={editingProduct.name}
                            onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-price">Prix (€)</Label>
                          <Input
                            id="edit-price"
                            type="number"
                            step="0.01"
                            value={editingProduct.price}
                            onChange={e =>
                              setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) || 0 })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editingProduct.description}
                          onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Catégorie</Label>
                        <Select
                          value={editingProduct.category}
                          onValueChange={value => setEditingProduct({ ...editingProduct, category: value })}
                        >
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
                          <Label htmlFor="edit-startDate">Date de début</Label>
                          <Input
                            id="edit-startDate"
                            type="date"
                            value={editingProduct.startDate}
                            onChange={e => setEditingProduct({ ...editingProduct, startDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-endDate">Date de fin</Label>
                          <Input
                            id="edit-endDate"
                            type="date"
                            value={editingProduct.endDate}
                            onChange={e => setEditingProduct({ ...editingProduct, endDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="edit-image">URL de l'image (optionnel)</Label>
                        <Input
                          id="edit-image"
                          value={editingProduct.image}
                          onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          placeholder="https://exemple.com/image.jpg"
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setEditingProduct(null)} className="hover:cursor-pointer">
                      Annuler
                    </Button>
                    <Button
                      onClick={handleUpdateProduct}
                      disabled={isUpdating}
                      className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer"
                    >
                      {isUpdating && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                      Enregistrer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
                </div>
              ) : (
                products.map(product => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Image
                            src={product.image || '/placeholder.svg'}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-gray-600 text-sm">{product.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant={product.active ? 'default' : 'secondary'}>
                                {product.active ? 'Actif' : 'Inactif'}
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleProductStatus(product.id)}
                            disabled={togglingId === product.id || deletingId === product.id}
                            className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
                          >
                            {togglingId === product.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : product.active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingProduct(product)}
                            disabled={togglingId === product.id || deletingId === product.id}
                            className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={deletingId === product.id || togglingId === product.id}
                            className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
                          >
                            {deletingId === product.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-bold">Gestion des commandes</h2>

            <div className="grid gap-4">
              {orders.map(order => (
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
                          <Badge className={mapOrderStatusColor(order.status)}>{mapOrderStatus(order.status)}</Badge>
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

async function uploadProductImage(file: File, baseName: string) {
  const form = new FormData()
  form.set('file', file)
  form.set('baseName', baseName || 'produit')

  const res = await fetch('/api/storage/upload', { method: 'POST', body: form })
  if (!res.ok) {
    console.error('Upload error:', await res.text())
    throw new Error('Échec de l\'upload de l\'image')
  }
  const { publicUrl } = await res.json()
  return publicUrl
}