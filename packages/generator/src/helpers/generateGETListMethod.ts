export default function generateGETListMethod(
  prismaClientModelPropertyName: string,
) {
  return `

export async function GET() {
  const prisma = new PrismaClient();
  const ${prismaClientModelPropertyName}List = await prisma.${prismaClientModelPropertyName}.findMany();
 
  return NextResponse.json(${prismaClientModelPropertyName}List)
}`
}
