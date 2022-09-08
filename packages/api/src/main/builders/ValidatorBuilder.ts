import { JoiEmailValidator } from '@/infra/validation/joi/validators/JoiEmailValidator/JoiEmailValidator'
import { IValidator } from '@/validation/protocols'
// import { EmailValidator, RequiredValueValidator } from '@/validation/validators'

export class ValidatorBuilder {
  private constructor(private readonly validators: IValidator[]) {}

  static create(): ValidatorBuilder {
    return new ValidatorBuilder([])
  }

  // required(): ValidatorBuilder {
  //   this.validators.push(new RequiredValueValidator())
  //   return this
  // }

  // email(): ValidatorBuilder {
  //   this.validators.push(new EmailValidator(new JoiEmailValidator()))
  //   return this
  // }

  // min(length: number): ValidationBuilder {
  //   this.validations.push(new MinLengthValidation(this.fieldName, length))
  //   return this
  // }

  // sameAs(fieldToCompare: string): ValidationBuilder {
  //   this.validations.push(
  //     new CompareFieldsValidation(this.fieldName, fieldToCompare),
  //   )
  //   return this
  // }

  build(): IValidator[] {
    return this.validators
  }
}
