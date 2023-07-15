export default function generatePOSTMethod(
  prismaClientModelPropertyName: string,
) {
  return `
export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  const data: any = request.json()
  const ${prismaClientModelPropertyName}= await prisma.${prismaClientModelPropertyName}.create({data});
 
  return NextResponse.json(${prismaClientModelPropertyName})
}`
}
