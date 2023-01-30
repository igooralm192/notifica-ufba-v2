import { GluegunToolbox } from 'gluegun'
import { GenerateFeatureArgs } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.generateController = async ({
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

    // Application

    // 1 - Criar um arquivo em application/controllers/<model>/<name:kebab>/<name:pascal>Controller.ts

    await toolbox.template.generate({
      template: 'application-controller.ejs',
      target: `${rootPath}/application/controllers/${featureModel}/${featureNameInKebab}/${featureNameInPascal}Controller.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em application/controllers/<model>/index.ts

    const applicationControllerIndexFilePath = `${rootPath}/application/controllers/${featureModel}/index.ts`
    const applicationFeatureControllerPath = `./${featureNameInKebab}/${featureNameInPascal}Controller`

    const applicationControllerIndexContent =
      await toolbox.filesystem.readAsync(applicationControllerIndexFilePath)

    if (
      !applicationControllerIndexContent.includes(
        applicationFeatureControllerPath
      )
    ) {
      await toolbox.filesystem.appendAsync(
        applicationControllerIndexFilePath,
        `export * from '${applicationFeatureControllerPath}'\n`
      )
    }

    // Main > Factory

    // 1 - Criar um arquivo em main/factories/controllers/<model>/<name:pascal>ControllerFactory.ts

    await toolbox.template.generate({
      template: 'main-factory-controller.ejs',
      target: `${rootPath}/main/factories/controllers/${featureModel}/${featureNameInPascal}ControllerFactory.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em main/factories/controllers/index.ts

    const mainControllerIndexFilePath = `${rootPath}/main/factories/controllers/index.ts`
    const mainFeatureControllerPath = `./${featureModel}/${featureNameInPascal}ControllerFactory`

    const mainControllerIndexContent = await toolbox.filesystem.readAsync(
      mainControllerIndexFilePath
    )

    if (!mainControllerIndexContent.includes(mainFeatureControllerPath)) {
      await toolbox.filesystem.appendAsync(
        mainControllerIndexFilePath,
        `export * from '${mainFeatureControllerPath}'\n`
      )
    }
  }
}
