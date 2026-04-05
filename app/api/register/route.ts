import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
   

    // Step 1 — check all fields are filled
    if (!name || !email || !password)
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      )

    // Step 2 — check if email already exists
    const existing = await prisma.user.findUnique({
      where: { email }
    })

    if (existing)
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      )

    // Step 3 — hash the password
    const hashed = await bcrypt.hash(password, 12)

    // Step 4 — save user to database
    await prisma.user.create({
      data: { name, email, password: hashed }
    })

    return NextResponse.json(
      { message: 'Account created!' },
      { status: 201 }
    )

  } catch (_err) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}