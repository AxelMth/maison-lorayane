import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
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
              />              <span className="ml-3 text-xl font-bold text-primary-foreground">Maison L'Orayane</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                    Accueil
                  </Link>
                  <Link href="/histoire" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                    Notre Histoire
                  </Link>
                  <Link href="/boutique" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                    Boutique
                  </Link>
                  <Link href="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:opacity-90">
                    Admin
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-amber-50 to-orange-100">
        <div className="absolute inset-0">
          <Image
            src="/french-bakery-interior.png"
            alt="Boulangerie Maison L'Orayane"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Maison L'Orayane</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              L'art de la boulangerie française traditionnelle depuis des générations
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
                <Link href="/boutique">Découvrir nos produits</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-amber-800 bg-transparent"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Bienvenue chez Maison L'Orayane</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
              Depuis plusieurs générations, notre famille perpétue la tradition de la boulangerie française. Chaque
              jour, nous préparons avec passion des pains et pâtisseries artisanales, en utilisant uniquement les
              meilleurs ingrédients et les techniques ancestrales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
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

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Viennoiseries</h3>
                <p className="text-gray-600">Croissants, pains au chocolat et autres délices préparés chaque matin</p>
              </CardContent>
            </Card>

            <Card className="text-center">
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
              <span className="ml-3 text-lg font-semibold">Maison L'Orayane</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">© 2024 Maison L'Orayane. Tous droits réservés.</p>
              <p className="text-sm mt-1">Boulangerie artisanale française</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
