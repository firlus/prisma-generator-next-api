import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const prisma = new PrismaClient()
  const userList = await prisma.user.findMany()

  return NextResponse.json(userList)
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient()
  const data: any = request.json()
  const user = await prisma.user.create({ data })

  return NextResponse.json(user)
}
