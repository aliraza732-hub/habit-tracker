import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session)
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })

  const { id } = await params

  // get today's date (without time)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // check if already completed today
  const existing = await prisma.completion.findFirst({
    where: {
      habitId: id,
      date: {
        gte: today,
        lt: tomorrow,
      }
    }
  })

  if (existing) {
    // already done → uncheck it
    await prisma.completion.delete({
      where: { id: existing.id }
    })
    return NextResponse.json({ checked: false })
  } else {
    // not done → check it
    await prisma.completion.create({
      data: {
        habitId: id,
        date: new Date(),
      }
    })
    return NextResponse.json({ checked: true })
  }
}