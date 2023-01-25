// import { mockStudent, mockUser } from '@/domain/mocks'
// import { usePrismaTestClient } from '@/infra/database/prisma/helpers'

// import faker from 'faker'

// import { PrismaStudentRepository } from '.'

// const makeSUT = () => {
//   const user = mockUser()
//   const student = mockStudent(user)
//   const studentRepository = new PrismaStudentRepository()

//   return {
//     SUT: studentRepository,
//     user,
//     student,
//   }
// }

// describe('PrismaStudentRepository', () => {
//   const getClient = usePrismaTestClient()

//   afterEach(async () => {
//     await getClient().student.deleteMany()
//   })

//   describe('create', () => {
//     it('should create and return a student', async () => {
//       const { SUT, student } = makeSUT()

//       const createdStudent = await SUT.create({
//         ...student,
//       })

//       const findStudent = await getClient().student.findFirst({
//         where: { matriculation: student.matriculation },
//       })

//       expect(createdStudent).toEqual({
//         ...findStudent,
//         user: undefined,
//       })
//     })
//   })

//   describe('findOne', () => {
//     it('should return student if matriculation exist', async () => {
//       const { SUT, student } = makeSUT()

//       await getClient().student.create({
//         data: {
//           matriculation: student.matriculation,
//           course: student.course,
//           userId: student.userId,
//         },
//       })

//       const findStudent = await SUT.findOne({
//         matriculation: student.matriculation,
//       })

//       expect(findStudent).toMatchObject({
//         id: expect.any(String),
//         matriculation: student.matriculation,
//         course: student.course,
//         userId: student.userId,
//       })
//     })

//     it('should return null if matriculation not exist', async () => {
//       const { SUT } = makeSUT()

//       const student = await SUT.findOne({
//         matriculation: faker.datatype.uuid(),
//       })

//       expect(student).toBeNull()
//     })
//   })
// })
