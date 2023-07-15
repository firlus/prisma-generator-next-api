import { DMMF } from '@prisma/generator-helper'

export default function generateGETOneMethod(
  prismaClientModelPropertyName: string,
  modelInfo: DMMF.Model,
) {
  const primaryKeyFieldName = modelInfo.fields.find((field) => field.isId)?.name
  return `
export async function GET(request: NextRequest, { params }: { params: { ${primaryKeyFieldName}: string }}) {
  const prisma = new PrismaClient();
  const ${prismaClientModelPropertyName} = await prisma.${prismaClientModelPropertyName}.findUnique({
    where: {
      ${primaryKeyFieldName}: parseInt(params.${primaryKeyFieldName})
    }
  });
 
  return NextResponse.json(${prismaClientModelPropertyName})
}`
}
