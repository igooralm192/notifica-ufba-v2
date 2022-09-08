import { usePrismaTestClient } from '@/infra/database/prisma/helpers'

import faker from 'faker'

import { PrismaDisciplineRepository } from '.'

const makeSUT = () => {
  const disciplineRepository = new PrismaDisciplineRepository()

  return {
    SUT: disciplineRepository,
  }
}

describe('PrismaDisciplineRepository', () => {
  const getClient = usePrismaTestClient()

  afterEach(async () => {
    await getClient().discipline.deleteMany()
  })

  describe('count', () => {
    it('should return total of disciplines', async () => {
      const { SUT } = makeSUT()

      await getClient().discipline.create({
        data: {
          name: faker.name.title(),
          code: faker.random.word(),
          course: faker.name.jobTitle(),
        },
      })

      await getClient().discipline.create({
        data: {
          name: faker.name.title(),
          code: faker.random.word(),
          course: faker.name.jobTitle(),
        },
      })

      const total = await SUT.count()

      expect(total).toBe(2)
    })
  })

  describe('findAll', () => {
    it('should return all disciplines', async () => {
      const { SUT } = makeSUT()

      const discipline1 = await getClient().discipline.create({
        data: {
          name: faker.name.title(),
          code: faker.random.word(),
          course: faker.name.jobTitle(),
        },
      })

      const discipline2 = await getClient().discipline.create({
        data: {
          name: faker.name.title(),
          code: faker.random.word(),
          course: faker.name.jobTitle(),
        },
      })

      const disciplines = await SUT.findAll()

      expect(disciplines).toEqual([discipline1, discipline2])
    })
  })
})
