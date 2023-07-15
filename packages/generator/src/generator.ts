import { generatorHandler, GeneratorOptions } from '@prisma/generator-helper'
import { logger } from '@prisma/sdk'
import path from 'path'
import { GENERATOR_NAME } from './constants'
import { genEnum } from './helpers/genEnum'
import { writeFileSafely } from './utils/writeFileSafely'
import generateGETListMethod from './helpers/generateGETListMethod'
import generateGETOneMethod from './helpers/generateGETOneMethod'
import generatePOSTMethod from './helpers/generatePOSTMethod'
import getImports from './helpers/getImports'

const { version } = require('../package.json')

generatorHandler({
  onManifest() {
    logger.info(`${GENERATOR_NAME}:Registered`)
    return {
      version,
      defaultOutput: '../src/app/api',
      prettyName: GENERATOR_NAME,
    }
  },
  onGenerate: async (options: GeneratorOptions) => {
    options.dmmf.datamodel.models.forEach(async (modelInfo) => {
      const modelNameLc = modelInfo.name.toLowerCase()
      const idFieldName = modelInfo.fields.find((field) => field.isId)?.name
      const getListMethod = generateGETListMethod(modelNameLc)
      const getOneMethod = generateGETOneMethod(modelNameLc, modelInfo)
      console.log(getOneMethod)
      const postMethod = generatePOSTMethod(modelNameLc)
      const writeLocationWithoutParams = path.join(
        options.generator.output?.value!,
        `${modelNameLc}/route.ts`,
      )
      const writeLocationWithParams = path.join(
        options.generator.output?.value!,
        `${modelNameLc}/[${idFieldName}]/route.ts`,
      )
      await writeFileSafely(
        writeLocationWithoutParams,
        `${getImports()}\n\n${getListMethod}\n\n${postMethod}`,
      )
      await writeFileSafely(
        writeLocationWithParams,
        `${getImports()}\n\n${getOneMethod}`,
      )
    })

    // options.dmmf.datamodel.enums.forEach(async (enumInfo) => {
    // const tsEnum = genEnum(enumInfo)

    // const writeLocation = path.join(
    // options.generator.output?.value!,
    // `${enumInfo.name}.ts`,
    // )

    // await writeFileSafely(writeLocation, tsEnum)
    // })
  },
})
