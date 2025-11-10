import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Nav from '@/components/nav'
import { Facebook, Instagram } from 'lucide-react'

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
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Depuis plusieurs générations, notre famille perpétue la tradition de la boulangerie française. Chaque
              jour, nous préparons avec passion des pains et pâtisseries artisanales, en utilisant uniquement les
              meilleurs ingrédients et les techniques ancestrales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/images/468098791_17948876597897027_4144459834020110199_n.jpg"
                  alt="Pains artisanaux"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pains Artisanaux</h3>
                <p className="text-gray-600">
                  Nos pains sont pétris et cuits selon les méthodes traditionnelles françaises
                </p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/images/525481923_17978152610897027_8075486966893642693_n.jpg"
                  alt="Viennoiseries artisanales"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Viennoiseries</h3>
                <p className="text-gray-600">Croissants, pains au chocolat et autres délices préparés chaque matin</p>
              </CardContent>
            </Card>

            <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src="/images/557538420_17985499265897027_621639666258727636_n.jpg"
                  alt="Pâtisseries maison"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎂</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pâtisseries</h3>
                <p className="text-gray-600">
                  Des créations sucrées qui raviront vos papilles et égayeront vos événements
                </p>
              </CardContent>
            </Card>
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
                  src="/images/545241540_17983109474897027_4359208589275347731_n.jpg"
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
                  src="/images/573046755_17989741748897027_3378583018265798393_n.jpg"
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

      {/* Gallery Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explorez notre univers à travers une sélection de nos plus belles créations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer">
              <Link href="/gallery">
                <div className="relative h-80 w-full">
                  <Image 
                    src="/images/image_9.jpg"
                    alt="Galerie - Créations artisanales"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center">Nos Créations</h3>
                </CardContent>
              </Link>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer">
              <Link href="/gallery">
                <div className="relative h-80 w-full">
                  <Image 
                    src="/images/image_51.jpg"
                    alt="Galerie - Viennoiseries"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center">Viennoiseries</h3>
                </CardContent>
              </Link>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer">
              <Link href="/gallery">
                <div className="relative h-80 w-full">
                  <Image 
                    src="/images/image_52.jpg"
                    alt="Galerie - Pâtisseries"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-center">Pâtisseries</h3>
                </CardContent>
              </Link>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer">
              <Link href="/gallery">Voir toute la galerie</Link>
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
