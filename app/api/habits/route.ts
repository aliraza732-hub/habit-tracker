import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { name, category } = await req.json();

  const habit = await prisma.habit.create({
    data: {
      name,
      category,
      userId: session.user.id,
    },
  });

  return NextResponse.json(habit, { status: 201 });
}
