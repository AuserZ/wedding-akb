import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { name, phone, attendance, guests } = await req.json()

  if (!name?.trim() || !phone?.trim() || !attendance) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const rsvp = await prisma.rsvp.create({
    data: {
      name: name.trim(),
      phone: phone.trim(),
      attendance,
      guests: Number(guests) || 1,
    },
  })

  return Response.json({ ok: true, rsvp }, { status: 201 })
}

export async function GET() {
  const rsvps = await prisma.rsvp.findMany({ orderBy: { createdAt: 'desc' } })
  const hadir  = rsvps.filter(r => r.attendance === 'hadir')
  const total  = hadir.reduce((s, r) => s + r.guests, 0)
  return Response.json({ rsvps, hadirCount: hadir.length, totalGuests: total })
}
