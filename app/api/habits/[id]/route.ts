import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session)
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 })

  const { id } = await params

  await prisma.habit.delete({
    where: { id }
  })

  return NextResponse.json({ message: 'Habit deleted' })
}