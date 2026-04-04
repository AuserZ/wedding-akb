import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/guests?name=Akbar  — validate a single invited guest
// GET /api/guests              — list all guests (for admin use)
export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')

  if (name) {
    const guest = await prisma.guest.findFirst({
      where: { name: { equals: name.trim(), mode: 'insensitive' } },
    })
    return Response.json({ found: !!guest, guest })
  }

  const guests = await prisma.guest.findMany({ orderBy: { name: 'asc' } })
  return Response.json({ guests })
}

// POST /api/guests  { name } or { names: string[] }
export async function POST(req: NextRequest) {
  const body = await req.json()

  // Bulk insert
  if (Array.isArray(body.names)) {
    const data = body.names
      .map((n: string) => n.trim())
      .filter(Boolean)
      .map((name: string) => ({ name }))

    await prisma.guest.createMany({ data, skipDuplicates: true })
    return Response.json({ ok: true, inserted: data.length }, { status: 201 })
  }

  // Single insert
  if (body.name?.trim()) {
    const guest = await prisma.guest.create({ data: { name: body.name.trim() } })
    return Response.json({ ok: true, guest }, { status: 201 })
  }

  return Response.json({ error: 'Provide name or names[]' }, { status: 400 })
}

// DELETE /api/guests?name=Akbar
export async function DELETE(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  if (!name) return Response.json({ error: 'name required' }, { status: 400 })

  await prisma.guest.deleteMany({
    where: { name: { equals: name.trim(), mode: 'insensitive' } },
  })
  return Response.json({ ok: true })
}
