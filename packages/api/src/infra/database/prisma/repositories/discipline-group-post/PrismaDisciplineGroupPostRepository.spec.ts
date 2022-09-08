// import { usePrismaTestClient } from '@/infra/database/prisma/helpers'
// import { mockDisciplineGroup } from '@/domain/mocks'

// import faker from 'faker'
// import { ObjectId } from 'mongodb'

// import { PrismaDisciplineGroupRepository } from '.'

// const makeSUT = () => {
//   const disciplineGroup = mockDisciplineGroup()
//   const disciplineGroupRepository = new PrismaDisciplineGroupRepository()

//   return {
//     SUT: disciplineGroupRepository,
//     disciplineGroup,
//   }
// }

// describe('PrismaDisciplineGroupRepository', () => {
//   const getClient = usePrismaTestClient()

//   afterEach(async () => {
//     await getClient().disciplineGroup.deleteMany()
//   })

//   describe('findOne', () => {
//     it('should return discipline group if id exist', async () => {
//       const { SUT, disciplineGroup } = makeSUT()

//       await getClient().disciplineGroup.create({
//         data: {
//           id: disciplineGroup.id,
//           code: disciplineGroup.code,
//           semester: disciplineGroup.semester,
//           description: disciplineGroup.description,
//           place: disciplineGroup.place,
//           classTime: disciplineGroup.classTime,
//           menuUrl: disciplineGroup.menuUrl,
//         },
//       })

//       const findDisciplineGroup = await SUT.findOne({ id: disciplineGroup.id })

//       expect(findDisciplineGroup).toMatchObject({
//         id: disciplineGroup.id,
//         code: disciplineGroup.code,
//         semester: disciplineGroup.semester,
//         description: disciplineGroup.description,
//         place: disciplineGroup.place,
//         classTime: disciplineGroup.classTime,
//         menuUrl: disciplineGroup.menuUrl,
//         createdAt: expect.any(Date),
//         updatedAt: expect.any(Date),
//       })
//     })

//     it('should return discipline group if code exist', async () => {
//       const { SUT, disciplineGroup } = makeSUT()

//       await getClient().disciplineGroup.create({
//         data: {
//           id: disciplineGroup.id,
//           code: disciplineGroup.code,
//           semester: disciplineGroup.semester,
//           description: disciplineGroup.description,
//           place: disciplineGroup.place,
//           classTime: disciplineGroup.classTime,
//           menuUrl: disciplineGroup.menuUrl,
//         },
//       })

//       const findDisciplineGroup = await SUT.findOne({
//         code: disciplineGroup.code,
//       })

//       expect(findDisciplineGroup).toMatchObject({
//         id: disciplineGroup.id,
//         code: disciplineGroup.code,
//         semester: disciplineGroup.semester,
//         description: disciplineGroup.description,
//         place: disciplineGroup.place,
//         classTime: disciplineGroup.classTime,
//         menuUrl: disciplineGroup.menuUrl,
//         createdAt: expect.any(Date),
//         updatedAt: expect.any(Date),
//       })
//     })
//   })

//   describe('pushStudent', () => {
//     it('should push student id to studentIds array in discipline group', async () => {
//       const { SUT } = makeSUT()

//       const { id } = await getClient().disciplineGroup.create({
//         data: {
//           code: faker.random.word(),
//           semester: faker.random.word(),
//           description: faker.random.words(),
//           place: faker.address.city(),
//           classTime: faker.date.recent(),
//           menuUrl: faker.internet.url(),
//         },
//       })

//       const studentId = new ObjectId().toString()

//       await SUT.pushStudent({
//         disciplineGroupId: id,
//         studentId,
//       })

//       const findDisciplineGroup = await getClient().disciplineGroup.findFirst({
//         where: { id },
//       })

//       expect(findDisciplineGroup.studentIds).toEqual([studentId])
//     })
//   })
// })
