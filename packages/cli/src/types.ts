// export types

import { GluegunToolbox } from 'gluegun'

export interface GenerateFeatureArgs {
  featureModel: string
  featureName: {
    normal: string
    camel: string
    kebab: string
    pascal: string
  }
}

export interface AppToolbox extends GluegunToolbox {
  generateUsecase: (args: GenerateFeatureArgs) => Promise<void>
  generateController: (args: GenerateFeatureArgs) => Promise<void>
  generateValidation: (args: GenerateFeatureArgs) => Promise<void>
  generateRoute: (args: GenerateFeatureArgs) => Promise<void>
}
