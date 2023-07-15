import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  return NextResponse.json(user)
}
