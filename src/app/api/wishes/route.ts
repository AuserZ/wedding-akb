import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const wishes = await prisma.wish.findMany({ orderBy: { createdAt: 'desc' } })
  return Response.json({ wishes })
}

export async function POST(req: NextRequest) {
  const { name, message } = await req.json()

  if (!name?.trim() || !message?.trim()) {
    return Response.json({ error: 'Name and message are required' }, { status: 400 })
  }

  const wish = await prisma.wish.create({
    data: { name: name.trim(), message: message.trim() },
  })

  return Response.json({ ok: true, wish }, { status: 201 })
}

// PATCH /api/wishes  { id, action: 'like' | 'unlike' }
export async function PATCH(req: NextRequest) {
  const { id, action } = await req.json()

  if (!id) return Response.json({ error: 'id required' }, { status: 400 })

  const wish = await prisma.wish.update({
    where: { id: Number(id) },
    data: { likes: { [action === 'unlike' ? 'decrement' : 'increment']: 1 } },
  })

  return Response.json({ ok: true, likes: wish.likes })
}
