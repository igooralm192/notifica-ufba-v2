import { GluegunToolbox } from 'gluegun'
import { GenerateFeatureArgs } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.generateValidation = async ({
    featureModel,
    featureName,
  }: GenerateFeatureArgs) => {
    const rootPath = `${__dirname}/../../../api/src`

    const featureNameInCamel = featureName.camel
    const featureNameInKebab = featureName.kebab
    const featureNameInPascal = featureName.pascal

    const commonProps = {
      featureModel,
      featureNameInCamel,
      featureNameInKebab,
      featureNameInPascal,
    }

    // Main > Factory

    // 1 - Criar um arquivo em main/factories/validation/<model>/<name:pascal>ValidationFactory.ts

    await toolbox.template.generate({
      template: 'main-factory-validation.ejs',
      target: `${rootPath}/main/factories/validation/${featureModel}/${featureNameInPascal}ValidationFactory.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em main/factories/validation/index.ts

    const mainValidationIndexFilePath = `${rootPath}/main/factories/validation/index.ts`
    const mainFeatureValidationPath = `./${featureModel}/${featureNameInPascal}ValidationFactory`

    const mainValidationIndexContent = await toolbox.filesystem.readAsync(
      mainValidationIndexFilePath
    )

    if (!mainValidationIndexContent.includes(mainFeatureValidationPath)) {
      await toolbox.filesystem.appendAsync(
        mainValidationIndexFilePath,
        `export * from '${mainFeatureValidationPath}'\n`
      )
    }
  }
}
