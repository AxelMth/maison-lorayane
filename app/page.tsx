"use client"

import { Facebook, Instagram, MapPin, Clock, Mail, Navigation } from 'lucide-react'
import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Nav from '@/components/nav'

export default async function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Array<{
    id: string
    name: string
    description: string | null
    image_url: string | null
    category: string
  }>>([])
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const res = await fetch(`/api/products?featured=1`, {
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        setFeaturedProducts(Array.isArray(data) ? data : [])
      }
    }
    fetchFeaturedProducts()
  }, [])
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Nav />

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="absolute inset-0">
          <Image 
            src="/images/515283011_728213573482694_1000083559690009543_n(1).jpg" 
            alt="Boulangerie Maison L'Orayane - Pains artisanaux fraîchement cuits" 
            fill 
            className="object-cover brightness-75" 
            priority 
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white drop-shadow-lg">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">Maison L&apos;Orayane</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl drop-shadow-md">
              L&apos;art de la boulangerie française traditionnelle depuis des générations
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer shadow-lg">
                <Link href="/products">Découvrir nos produits</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white bg-white/20 backdrop-blur-sm hover:cursor-pointer hover:bg-amber-600 hover:text-white border-white hover:border-amber-600"
              >
                <Link href="/histoire">Notre histoire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Nos Créations du Moment</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Découvrez notre sélection de produits artisanaux, préparés chaque jour avec passion et savoir-faire
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredProducts.map(p => (
                <Card key={p.id} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="relative h-48 sm:h-56 lg:h-64 w-full">
                    <Image
                      src={'/images' + p.image_url || '/images/placeholder.png'}
                      alt={p.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="font-semibold text-center text-sm sm:text-base">{p.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>Aucune création à la une pour le moment. Revenez bientôt !</p>
            </div>
          )}

          <div className="text-center mt-8 sm:mt-12">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer w-full sm:w-auto">
              <Link href="/products">Voir tous nos produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Opening Hours Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Nous Contacter</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              Venez nous rendre visite au Domaine de Marolles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Address */}
            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 rounded-full flex-shrink-0">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Adresse</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Le Domaine de Marolles<br />
                    28320 GAS
                  </p>
                </div>
              </div>
            </Card>

            {/* Opening Hours */}
            <Card className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 rounded-full flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Horaires d&apos;ouverture</h3>
                  <div className="text-sm sm:text-base text-gray-600 space-y-1">
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium">Samedi :</span>
                      <span className="break-words">8h00-12h30 / 15h30-18h00</span>
                    </p>
                    <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-medium">Dimanche :</span>
                      <span>8h00-12h30</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-4 sm:p-5 lg:p-6 sm:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2 sm:p-3 bg-amber-100 rounded-full flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Contact</h3>
                  <a 
                    href="mailto:maisonlorayane@gmail.com" 
                    className="text-sm sm:text-base text-amber-600 hover:text-amber-700 hover:underline break-all"
                  >
                    maisonlorayane@gmail.com
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Find Us Button */}
          <div className="text-center mt-6 sm:mt-8">
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer w-full sm:w-auto"
            >
              <Link 
                href="https://maps.app.goo.gl/KZw8jNyrm5LWWqwH6"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="mr-2 h-5 w-5" />
                Nous trouver
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image
                src="/images/maison-lorayane.jpg"
                alt="Maison L'Orayane"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="ml-3 text-lg font-semibold">Maison L&apos;Orayane</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2024 Maison L&apos;Orayane. Tous droits réservés.</p>
              <p className="text-sm mt-1">Boulangerie artisanale française</p>
            </div>
            <div className="flex items-center mt-4 md:mb-0 gap-4">
              <Link
                href="https://www.facebook.com/p/Maison-LOrayane-100088821732375/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-90"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/maison_lorayane/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-90"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
