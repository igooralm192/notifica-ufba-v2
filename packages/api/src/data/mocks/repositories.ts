import {
  ICountDisciplineRepository,
  ICreateStudentRepository,
  IFindAllDisciplineRepository,
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  IPushStudentDisciplineGroupRepository,
  IUserRepository,
} from '@/data/contracts'
import { IDisciplineGroup } from '@shared/entities'

export class MockedDisciplineGroupRepository
  implements
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository
{
  findOne(): Promise<IFindOneDisciplineGroupRepository.Output> {
    throw new Error('Method not implemented.')
  }
  pushStudent(): Promise<IDisciplineGroup> {
    throw new Error('Method not implemented.')
  }
}

export class MockedDisciplineRepository
  implements ICountDisciplineRepository, IFindAllDisciplineRepository
{
  count(): Promise<ICountDisciplineRepository.Output> {
    throw new Error('Method not implemented.')
  }
  findAll(): Promise<IFindAllDisciplineRepository.Output> {
    throw new Error('Method not implemented.')
  }
}

export class MockedStudentRepository
  implements IFindOneStudentRepository, ICreateStudentRepository
{
  create(): Promise<ICreateStudentRepository.Output> {
    throw new Error('Method not implemented.')
  }
  findOne(): Promise<IFindOneStudentRepository.Output> {
    throw new Error('Method not implemented.')
  }
}

export class MockedUserRepository
  implements IUserRepository.Create, IUserRepository.FindOne
{
  create(): Promise<IUserRepository.Create.Output> {
    throw new Error('Method not implemented.')
  }
  findOne(): Promise<IUserRepository.FindOne.Output> {
    throw new Error('Method not implemented.')
  }
}
