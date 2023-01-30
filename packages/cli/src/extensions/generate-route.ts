import { GluegunToolbox } from 'gluegun'
import { GenerateFeatureArgs } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.generateRoute = async ({
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

    // 1 - Criar um arquivo em main/factories/routes/<model>/<name:kebab>/<name:pascal>RouteFactory.ts

    await toolbox.template.generate({
      template: 'main-factory-route.ejs',
      target: `${rootPath}/main/factories/routes/${featureModel}/${featureNameInKebab}/${featureNameInPascal}RouteFactory.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em main/factories/routes/<name:kebab>/index.ts

    const mainRouteIndexFilePath = `${rootPath}/main/factories/routes/${featureModel}/index.ts`
    const mainFeatureRoutePath = `./${featureNameInKebab}/${featureNameInPascal}RouteFactory`

    const mainRouteIndexContent = await toolbox.filesystem.readAsync(
      mainRouteIndexFilePath
    )

    if (!mainRouteIndexContent.includes(mainFeatureRoutePath)) {
      await toolbox.filesystem.appendAsync(
        mainRouteIndexFilePath,
        `export * from '${mainFeatureRoutePath}'\n`
      )
    }
  }
}
