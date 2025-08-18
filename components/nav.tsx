import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="bg-primary text-primary-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
            src="/images/maison-lorayane.jpg"
            alt="Maison L'Orayane"
            width={60}
            height={100}
            className="rounded-full"
            />
            <span className="ml-3 text-xl font-bold text-primary-foreground">Maison L'Orayane</span>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}