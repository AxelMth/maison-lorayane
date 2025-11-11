import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const all = url.searchParams.get('all')

    if (all) {
      const { rows } = await query(
        `SELECT * FROM products
         ORDER BY category ASC, name ASC`
      )
      return NextResponse.json(rows)
    }

    const { rows } = await query(
      `SELECT * FROM products
       WHERE active = TRUE
         AND end_date >= CURRENT_DATE
         AND start_date <= CURRENT_DATE
       ORDER BY category ASC, name ASC`
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      description,
      image_url,
      category,
      start_date,
      end_date,
    } = body || {}

    const { rows } = await query(
      `INSERT INTO products
        (name, description, image_url, category, active, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, TRUE, $6, $7)
       RETURNING *`,
      [
        name,
        description ?? null,
        image_url || '/placeholder.svg?height=200&width=300',
        category,
        start_date ?? null,
        end_date ?? null,
      ]
    )

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
