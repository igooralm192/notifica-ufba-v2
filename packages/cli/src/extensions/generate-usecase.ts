import { GluegunToolbox } from 'gluegun'
import { GenerateFeatureArgs } from '../types'

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.generateUsecase = async ({
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

    // Domain

    // 1 - Criar um arquivo em domain/usecases/<model>/<name>UseCase.ts

    await toolbox.template.generate({
      template: 'domain-usecase.ejs',
      target: `${rootPath}/domain/usecases/${featureModel}/${featureNameInPascal}UseCase.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em domain/usecases/index.ts

    const domainUsecaseIndexFilePath = `${rootPath}/domain/usecases/index.ts`
    const domainFeatureUsecasePath = `./${featureModel}/${featureNameInPascal}UseCase`

    const domainUsecaseIndexContent = await toolbox.filesystem.readAsync(
      domainUsecaseIndexFilePath
    )

    if (!domainUsecaseIndexContent.includes(domainFeatureUsecasePath)) {
      await toolbox.filesystem.appendAsync(
        domainUsecaseIndexFilePath,
        `export * from '${domainFeatureUsecasePath}'\n`
      )
    }

    // Data

    // 1 - Criar um arquivo em data/usecases/<model>/<name:kebakcase>/<name:camelcase>UseCase.ts

    await toolbox.template.generate({
      template: 'data-usecase.ejs',
      target: `${rootPath}/data/usecases/${featureModel}/${featureNameInKebab}/${featureNameInPascal}UseCase.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em data/usecases/<model>/index.ts

    const dataUsecaseIndexFilePath = `${rootPath}/data/usecases/${featureModel}/index.ts`
    const dataFeatureUsecasePath = `./${featureNameInKebab}/${featureNameInPascal}UseCase`

    const dataUsecaseIndexContent = await toolbox.filesystem.readAsync(
      dataUsecaseIndexFilePath
    )

    if (!dataUsecaseIndexContent.includes(dataFeatureUsecasePath)) {
      await toolbox.filesystem.appendAsync(
        dataUsecaseIndexFilePath,
        `export * from '${dataFeatureUsecasePath}'\n`
      )
    }

    // Main > Factory

    // 1 - Criar um arquivo em main/factories/usecases/<model>/<name:kebakcase>/<name:camelcase>UseCaseFactory.ts

    await toolbox.template.generate({
      template: 'main-factory-usecase.ejs',
      target: `${rootPath}/main/factories/usecases/${featureModel}/${featureNameInPascal}UseCaseFactory.ts`,
      props: commonProps,
    })

    // 2 - Adicionar export em main/factories/usecases/index.ts

    const mainUsecaseIndexFilePath = `${rootPath}/main/factories/usecases/index.ts`
    const mainFeatureUsecasePath = `./${featureModel}/${featureNameInPascal}UseCaseFactory`

    const mainUsecaseIndexContent = await toolbox.filesystem.readAsync(
      mainUsecaseIndexFilePath
    )

    if (!mainUsecaseIndexContent.includes(mainFeatureUsecasePath)) {
      await toolbox.filesystem.appendAsync(
        mainUsecaseIndexFilePath,
        `export * from '${mainFeatureUsecasePath}'\n`
      )
    }
  }
}
