import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const file = form.get('file') as File | null
    const baseName = (form.get('baseName') as string) || 'produit'

    if (!file) {
      return NextResponse.json({ error: 'Fichier manquant' }, { status: 400 })
    }

    const BUCKET = 'product-images'
    const ext = file.name.split('.').pop() || 'jpg'
    const safe = baseName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const fileName = `${safe}-${Date.now()}.${ext}`
    const filePath = `products/${fileName}`

    const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'application/octet-stream',
    })
    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: 'Échec de l’upload' }, { status: 500 })
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)
    return NextResponse.json({ publicUrl: data.publicUrl })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
