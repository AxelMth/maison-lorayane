import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HistoirePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/" className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium">
                  Accueil
                </Link>
                <Link
                  href="/histoire"
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Notre Histoire
                </Link>
                <Link
                  href="/boutique"
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
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
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notre Histoire</h1>
          <p className="text-xl text-gray-600">Une tradition familiale qui se transmet de génération en génération</p>
        </div>

        <div className="space-y-12">
          {/* Histoire principale */}
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Les Origines</h2>
                  <p className="text-gray-600 mb-4">
                    L'histoire de Maison L'Orayane commence au début du 20ème siècle, lorsque notre arrière-grand-père
                    ouvre sa première boulangerie dans le cœur de la France. Animé par la passion du pain et des
                    traditions artisanales, il pose les fondations de ce qui deviendra une véritable institution
                    familiale.
                  </p>
                  <p className="text-gray-600">
                    Depuis lors, chaque génération a apporté sa pierre à l'édifice, préservant les recettes ancestrales
                    tout en innovant pour satisfaire les goûts contemporains.
                  </p>
                </div>
                <div>
                  <Image
                    src="/vintage-french-bakery.png"
                    alt="Ancienne boulangerie"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vidéo section */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Découvrez notre processus de fabrication
              </h2>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                  <p className="text-gray-600">Vidéo : Le processus de fabrication artisanale</p>
                  <p className="text-sm text-gray-500 mt-2">(Intégration vidéo à configurer avec vos fichiers)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tradition et modernité */}
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/placeholder-m6362.png"
                    alt="Boulangerie moderne"
                    width={400}
                    height={300}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tradition et Modernité</h2>
                  <p className="text-gray-600 mb-4">
                    Aujourd'hui, Maison L'Orayane allie parfaitement tradition et modernité. Nos fours à bois côtoient
                    les équipements les plus modernes, permettant de maintenir la qualité artisanale tout en répondant
                    aux exigences contemporaines.
                  </p>
                  <p className="text-gray-600">
                    Notre équipe de boulangers passionnés perpétue les gestes ancestraux, garantissant à chaque produit
                    le goût authentique qui fait notre réputation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valeurs */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Nos Valeurs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <h3 className="font-semibold mb-2">Qualité</h3>
                  <p className="text-gray-600 text-sm">Sélection rigoureuse des meilleurs ingrédients</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <h3 className="font-semibold mb-2">Tradition</h3>
                  <p className="text-gray-600 text-sm">Savoir-faire transmis de génération en génération</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Passion</h3>
                  <p className="text-gray-600 text-sm">L'amour du métier dans chaque création</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700">
            <Link href="/boutique">Découvrir nos produits</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
