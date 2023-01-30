import { AppToolbox, GenerateFeatureArgs } from '../../types'

module.exports = {
  name: 'feature',
  run: async (toolbox: AppToolbox) => {
    const { featureModel, featureName } = await toolbox.prompt.ask([
      {
        type: 'select',
        name: 'featureModel',
        message: 'What feature do you want to create?',
        choices: [
          { message: 'Auth', name: 'auth' },
          { message: 'Discipline', name: 'discipline' },
          { message: 'Discipline Group', name: 'discipline-group' },
          { message: 'Student', name: 'student' },
          { message: 'Teacher', name: 'teacher' },
          { message: 'User', name: 'user' },
        ],
      },
      {
        type: 'input',
        name: 'featureName',
        message: 'What is the feature name?',
      },
    ])

    if (!featureName) {
      toolbox.print.error('No feature name specified!')
      return
    }

    const featureNameInCamel = toolbox.strings.camelCase(featureName)
    const featureNameInKebab = toolbox.strings.kebabCase(featureName)
    const featureNameInPascal = toolbox.strings.pascalCase(featureName)

    const featureArgs: GenerateFeatureArgs = {
      featureModel,
      featureName: {
        normal: featureName,
        camel: featureNameInCamel,
        kebab: featureNameInKebab,
        pascal: featureNameInPascal,
      },
    }

    await toolbox.generateUsecase(featureArgs)
    await toolbox.generateController(featureArgs)
    await toolbox.generateValidation(featureArgs)
    await toolbox.generateRoute(featureArgs)

    toolbox.print.success('All feature files has been generated successfully!')
  },
}
