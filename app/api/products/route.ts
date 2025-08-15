import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const all = url.searchParams.get("all")

    if (all) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) {
        console.error("Erreur lors de la récupération des produits:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
      }

      return NextResponse.json(products)
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .gte("end_date", new Date().toISOString().split("T")[0])
      .lte("start_date", new Date().toISOString().split("T")[0])
      .order("category", { ascending: true })
      .order("name", { ascending: true })

    if (error) {
      console.error("Erreur lors de la récupération des produits:", error)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    return NextResponse.json(products)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { data: product, error } = await supabase
      .from("products")
      .insert([
        {
          name: body.name,
          description: body.description,
          price: body.price,
          image_url: body.image_url || "/placeholder.svg?height=200&width=300",
          category: body.category,
          active: true,
          start_date: body.start_date,
          end_date: body.end_date,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Erreur lors de la création du produit:", error)
      return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Erreur:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
