import { StudentAlreadyExistsError } from '@/domain/errors'
import { ICreateStudentUseCase, ICreateUserUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  ICreateStudentRepository,
  IFindOneStudentRepository,
} from '@/data/contracts'

export class CreateStudentUseCase implements ICreateStudentUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly createUserUseCase: ICreateUserUseCase,
    private readonly createStudentRepository: ICreateStudentRepository,
  ) {}

  async run({
    name,
    email,
    password,
    matriculation,
    course,
  }: ICreateStudentUseCase.Input): Promise<
    Either<BaseError, ICreateStudentUseCase.Output>
  > {
    const student = await this.findOneStudentRepository.findOne({
      matriculation,
    })

    if (student) return left(new StudentAlreadyExistsError())

    const resultOrError = await this.createUserUseCase.run({
      name,
      email,
      password,
    })

    if (resultOrError.isLeft()) {
      return left(resultOrError.value)
    }

    const { user } = resultOrError.value

    const createdStudent = await this.createStudentRepository.create({
      matriculation,
      course,
      userId: user.id,
    })

    return right({ student: createdStudent })
  }
}
