import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    const update: any = {}
    const allowed = ['name', 'description', 'image_url', 'category', 'active', 'start_date', 'end_date']
    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key]
    }

    if (Object.keys(update).length === 0) {
      return NextResponse.json({ error: 'Aucun champ à mettre à jour' }, { status: 400 })
    }

    const setClauses: string[] = []
    const values: any[] = []
    let idx = 1
    for (const [key, value] of Object.entries(update)) {
      setClauses.push(`${key} = $${idx++}`)
      values.push(value)
    }
    // Always bump updated_at if the column exists
    setClauses.push(`updated_at = NOW()`)
    values.push(id)

    const { rows } = await query(
      `UPDATE products
         SET ${setClauses.join(', ')}
       WHERE id = $${values.length}
       RETURNING *`,
      values
    )

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await query(`DELETE FROM products WHERE id = $1`, [id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
