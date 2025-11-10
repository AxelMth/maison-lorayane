import { NextResponse } from 'next/server'
import { supabaseAdmin as supabase } from '@/lib/supabase-admin'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const update: any = {}
    const allowed = ['name', 'description', 'image_url', 'category', 'active', 'start_date', 'end_date']
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key]
    }

    const { data, error } = await supabase.from('products').update(update).eq('id', id).select().single()
    if (error) {
      console.error('Erreur lors de la mise à jour du produit:', error)
      return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      console.error('Erreur lors de la suppression du produit:', error)
      return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
