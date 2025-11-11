import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    const baseName = (form.get('baseName') as string) || 'produit'

    if (!file) {
      return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const safe = baseName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const fileName = `${safe}-${Date.now()}.${ext}`
    const filePath = `products/${fileName}`

    return NextResponse.json({ publicUrl: filePath })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
