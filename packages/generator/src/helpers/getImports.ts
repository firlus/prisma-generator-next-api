export default function getImports() {
  return `
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
  `
}
