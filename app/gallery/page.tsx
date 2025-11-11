import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/components/nav'
import { Card, CardContent } from '@/components/ui/card'

// List of all images in the public/images folder (excluding branding and placeholder images)
const galleryImages = [
  { src: '/images/468098791_17948876597897027_4144459834020110199_n.jpg', alt: 'Pains artisanaux' },
  { src: '/images/496009189_17968750289897027_4541325153468900542_n.jpg', alt: 'Produits de boulangerie' },
  { src: '/images/504308245_17972860889897027_4246230941807376782_n.jpg', alt: 'Créations artisanales' },
  { src: '/images/515283011_728213573482694_1000083559690009543_n(1).jpg', alt: 'Boulangerie Maison L\'Orayane' },
  { src: '/images/545241540_17983109474897027_4359208589275347731_n.jpg', alt: 'Spécialités quotidiennes' },
  { src: '/images/557538420_17985499265897027_621639666258727636_n.jpg', alt: 'Pâtisseries maison' },
  { src: '/images/573046755_17989741748897027_3378583018265798393_n.jpg', alt: 'Pains tradition' },
  { src: '/images/banner.jpg', alt: 'Bannière Maison L\'Orayane' },
  { src: '/images/image_10.jpg', alt: 'Création artisanale' },
  { src: '/images/image_49.jpg', alt: 'Produit de boulangerie' },
  { src: '/images/image_5.jpg', alt: 'Spécialité boulangère' },
  { src: '/images/image_50.jpg', alt: 'Pains artisanaux' },
  { src: '/images/image_51.jpg', alt: 'Viennoiseries' },
  { src: '/images/image_52.jpg', alt: 'Pâtisseries' },
  { src: '/images/image_53.jpg', alt: 'Créations uniques' },
  { src: '/images/image_54.jpg', alt: 'Produits frais' },
  { src: '/images/image_55.jpg', alt: 'Boulangerie artisanale' },
  { src: '/images/image_56.jpg', alt: 'Pains spéciaux' },
  { src: '/images/image_57.jpg', alt: 'Délices de la boulangerie' },
  { src: '/images/image_58.jpg', alt: 'Tradition française' },
  { src: '/images/image_9.jpg', alt: 'Artisanat boulanger' },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {/* Header */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Galerie</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos créations artisanales, nos pains fraîchement cuits et nos pâtisseries préparées avec passion
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-gray-600 text-center">{image.alt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-700 font-medium hover:underline"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  )
}

