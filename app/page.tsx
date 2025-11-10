import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Nav from '@/components/nav'
import { Facebook, Instagram, MapPin, Clock, Wheat, Croissant, Cake } from 'lucide-react'

export default function HomePage() {
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
                <Link href="/boutique">Découvrir nos produits</Link>
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

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bienvenue chez Maison L&apos;Orayane</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Depuis plusieurs générations, notre famille perpétue la tradition de la boulangerie française. Chaque
              jour, nous préparons avec passion des pains et pâtisseries artisanales, en utilisant uniquement les
              meilleurs ingrédients et les techniques ancestrales.
            </p>
            <Button asChild variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white hover:cursor-pointer">
              <Link href="/histoire">Découvrir notre histoire</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Créations du Moment</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits artisanaux, préparés chaque jour avec passion et savoir-faire
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image 
                  src="/images/image_9.jpg"
                  alt="Spécialité du jour"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">Spécialités Quotidiennes</h3>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image 
                  src="/images/image_57.jpg"
                  alt="Pain artisanal"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">Pains Tradition</h3>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image 
                  src="/images/503066281_17971591739897027_4167429648620474630_n.jpg"
                  alt="Produits de qualité"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">Pains Spéciaux</h3>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image 
                  src="/images/504308245_17972860889897027_4246230941807376782_n.jpg"
                  alt="Passion du pain"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-center">Créations Uniques</h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer">
              <Link href="/boutique">Voir tous nos produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Opening Hours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nous Contacter</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Venez nous rendre visite au Domaine de Marolles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Address */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <MapPin className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Adresse</h3>
                  <p className="text-gray-600">
                    Le Domaine de Marolles<br />
                    28320 GAS
                  </p>
                </div>
              </div>
            </Card>

            {/* Opening Hours */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-100 rounded-full">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Horaires d&apos;ouverture</h3>
                  <div className="text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Samedi :</span>
                      <span>8h00-12h30 / 15h30-18h00</span>
                      <span>☀️</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Dimanche :</span>
                      <span>8h00-12h30</span>
                      <span>☀️</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Special Features */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <div className="flex justify-center mb-3">
                  <Wheat className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-gray-700 font-medium">
                  🌾 Farine de la ferme écrasé sur meule de pierre
                </p>
              </div>
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <div className="flex justify-center mb-3">
                  <Croissant className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-gray-700 font-medium">
                  🥖 Pain au levain naturel
                </p>
              </div>
              <div className="text-center p-6 bg-amber-50 rounded-lg">
                <div className="flex justify-center mb-3">
                  <Cake className="h-8 w-8 text-amber-600" />
                </div>
                <p className="text-gray-700 font-medium">
                  🍰 Pâtisseries de saison
                </p>
              </div>
            </div>
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
