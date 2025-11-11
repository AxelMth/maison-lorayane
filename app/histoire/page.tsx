import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Nav from '@/components/nav'
import { Cake, Croissant, Wheat } from 'lucide-react'

export default function HistoirePage() {
  const galleryImages = [
    { src: '/images/515283011_728213573482694_1000083559690009543_n(1).jpg', alt: 'Nos délicieuses créations artisanales' },
    { src: '/images/468098791_17948876597897027_4144459834020110199_n.jpg', alt: 'Pain traditionnel fraîchement sorti du four' },
    { src: '/images/496009189_17968750289897027_4541325153468900542_n.jpg', alt: 'Variété de pains artisanaux' },
    { src: '/images/557538420_17985499265897027_621639666258727636_n.jpg', alt: 'Pâtisseries maison' },
    { src: '/images/545241540_17983109474897027_4359208589275347731_n.jpg', alt: 'Spécialités du jour' },
    { src: '/images/573046755_17989741748897027_3378583018265798393_n.jpg', alt: 'Savoir-faire artisanal' },
    { src: '/images/504308245_17972860889897027_4246230941807376782_n.jpg', alt: 'Notre passion du pain' },
    { src: '/images/496009189_17968750289897027_4541325153468900542_n.jpg', alt: 'Produits de qualité' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Nav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-balance">Notre Histoire</h1>
          <p className="text-lg sm:text-xl text-gray-600 break-words">
            Une passion pour le pain artisanal transmise de génération en génération
          </p>
        </div>

        <div className="space-y-12">
          {/* Image principale hero */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/images/515283011_728213573482694_1000083559690009543_n(1).jpg"
                  alt="Maison L'Orayane - Notre passion du pain"
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </CardContent>
          </Card>

          {/* Histoire principale */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">Les Origines de Maison L&apos;Orayane</h2>
                  <p className="text-gray-600 mb-4 break-words">
                    Depuis plusieurs générations, la Maison L&apos;Orayane perpétue une tradition boulangère 
                    authentique ancrée dans le terroir français. Notre histoire commence dans une petite boulangerie 
                    familiale où le pain était pétri à la main avant l&apos;aube, suivant des recettes transmises 
                    de père en fils.
                  </p>
                  <p className="text-gray-600 mb-4 break-words">
                    Chaque matin, nos boulangers se lèvent aux aurores pour perpétuer cette tradition séculaire. 
                    Le parfum du pain chaud qui embaume nos ateliers est le fruit d&apos;un savoir-faire minutieux, 
                    d&apos;une sélection rigoureuse des farines et d&apos;une patience infinie dans le respect des 
                    temps de fermentation.
                  </p>
                  <p className="text-gray-600 break-words">
                    Notre engagement : offrir à nos clients des produits d&apos;exception, où chaque baguette, 
                    chaque croissant, chaque viennoiserie raconte l&apos;histoire d&apos;un artisanat passionné.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/468098791_17948876597897027_4144459834020110199_n.jpg"
                    alt="Pain traditionnel fraîchement cuit"
                    width={500}
                    height={400}
                    sizes="(min-width: 768px) 500px, 100vw"
                    className="w-full h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notre savoir-faire */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/496009189_17968750289897027_4541325153468900542_n.jpg"
                    alt="Variété de nos produits artisanaux"
                    width={500}
                    height={400}
                    sizes="(min-width: 768px) 500px, 100vw"
                    className="w-full h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">Un Savoir-Faire d&apos;Excellence</h2>
                  <p className="text-gray-600 mb-4 break-words">
                    Chez Maison L&apos;Orayane, nous croyons que la qualité commence par le choix des matières premières. 
                    Nos farines sont sélectionnées auprès de meuniers de confiance, nos levains sont entretenus avec soin, 
                    et nos recettes respectent les méthodes traditionnelles de pétrissage et de cuisson.
                  </p>
                  <p className="text-gray-600 mb-4 break-words">
                    Le secret de nos pains réside dans le temps accordé à chaque étape : pointage, division, façonnage, 
                    apprêt et cuisson. Chaque geste compte pour révéler les arômes complexes et la texture parfaite 
                    d&apos;un pain authentique.
                  </p>
                  <p className="text-gray-600 break-words">
                    De la baguette tradition dorée et croustillante aux pains de campagne généreux, en passant par 
                    nos viennoiseries au beurre pur, chaque création porte la marque de notre exigence artisanale.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tradition et modernité */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">Tradition et Innovation</h2>
                  <p className="text-gray-600 mb-4 break-words">
                    Aujourd&apos;hui, Maison L&apos;Orayane allie parfaitement tradition et modernité. Tout en 
                    préservant les méthodes ancestrales qui font notre réputation, nous innovons constamment pour 
                    proposer de nouvelles créations qui surprennent et ravissent nos clients.
                  </p>
                  <p className="text-gray-600 mb-4 break-words">
                    Nos fours à sole en pierre, chauffés à la température idéale, garantissent une cuisson homogène 
                    et cette croûte dorée si caractéristique. Notre laboratoire moderne nous permet de travailler 
                    dans des conditions optimales d&apos;hygiène tout en maintenant l&apos;authenticité de nos produits.
                  </p>
                  <p className="text-gray-600 break-words">
                    Nous sommes fiers de contribuer à maintenir vivante la tradition boulangère française, 
                    inscrite au patrimoine culturel immatériel de l&apos;UNESCO depuis 2022.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/557538420_17985499265897027_621639666258727636_n.jpg"
                    alt="Nos créations artisanales"
                    width={500}
                    height={400}
                    sizes="(min-width: 768px) 500px, 100vw"
                    className="w-full h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Galerie photos */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center text-balance">
                Notre Passion en Images
              </h2>
              <p className="text-center text-gray-600 mb-4 break-words">
                Découvrez l&apos;univers de Maison L&apos;Orayane à travers notre galerie
              </p>
              <div className="text-center mb-8">
                <Button asChild variant="outline" className="hover:cursor-pointer">
                  <Link href="/gallery">Voir la galerie complète</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notre engagement */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center text-balance">Notre Engagement</h2>
              <div className="max-w-3xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-amber-50 rounded-lg">
                    <div className="flex justify-center mb-3">
                      <Wheat className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Farine de la ferme écrasé sur meule de pierre
                    </p>
                  </div>
                  <div className="text-center p-6 bg-amber-50 rounded-lg">
                    <div className="flex justify-center mb-3">
                      <Croissant className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Pain au levain naturel
                    </p>
                  </div>
                    <div className="text-center p-6 bg-amber-50 rounded-lg">
                    <div className="flex justify-center mb-3">
                      <Cake className="h-8 w-8 text-amber-600" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      Pâtisseries de saison
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white hover:cursor-pointer">
            <Link href="/products">Découvrir nos produits</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
