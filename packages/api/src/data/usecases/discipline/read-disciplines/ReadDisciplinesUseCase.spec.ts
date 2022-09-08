// import { IDiscipline } from '@shared/entities'
// import {
//   mockDiscipline,
//   mockDisciplineGroup,
//   mockTeacher,
// } from '@/domain/mocks'

// import { MockedDisciplineRepository } from '@/data/mocks/repositories'

// import { ReadDisciplinesUseCase } from '.'

// const makeSUT = () => {
//   const teacher = mockTeacher()
//   const disciplineGroup = mockDisciplineGroup({
//     teacher,
//     teacherId: teacher.id,
//   })

//   const discipline = mockDiscipline({
//     groups: [disciplineGroup],
//   })

//   const disciplineRepository = new MockedDisciplineRepository()
//   const readDisciplinesUseCase = new ReadDisciplinesUseCase(
//     disciplineRepository,
//     disciplineRepository,
//   )

//   const findAllSpy = jest.spyOn(disciplineRepository, 'findAll')
//   findAllSpy.mockResolvedValue([discipline])

//   const countSpy = jest.spyOn(disciplineRepository, 'count')
//   countSpy.mockResolvedValue(1)

//   return {
//     SUT: readDisciplinesUseCase,
//     findAllSpy,
//     countSpy,
//     teacher,
//     disciplineGroup,
//     discipline,
//   }
// }

// describe('ReadDisciplinesUseCase', () => {
//   it('should call findAll repository correctly', async () => {
//     const { SUT, findAllSpy } = makeSUT()

//     const paginateListInput = {
//       page: 1,
//       limit: 2,
//     }

//     await SUT.run({ paginate: paginateListInput })

//     expect(findAllSpy).toHaveBeenCalledWith({
//       take: paginateListInput.limit,
//       skip: paginateListInput.page,
//       include: {
//         groups: {
//           include: {
//             teacher: { include: { user: true } },
//           },
//         },
//       },
//     })
//   })

//   it('should call count repository correctly', async () => {
//     const { SUT, countSpy } = makeSUT()

//     await SUT.run()

//     expect(countSpy).toHaveBeenCalled()
//   })

//   it('should be able to read all disciplines', async () => {
//     const { SUT, discipline, disciplineGroup, teacher } = makeSUT()

//     const resultOrError = await SUT.run()
//     const result = resultOrError.right()

//     expect(result).toEqual({
//       results: <IDiscipline[]>[
//         {
//           id: discipline.id,
//           name: discipline.name,
//           code: discipline.code,
//           course: discipline.course,
//           groups: [
//             {
//               id: disciplineGroup.id,
//               code: disciplineGroup.code,
//               semester: disciplineGroup.semester,
//               description: disciplineGroup.description,
//               place: disciplineGroup.place,
//               menuUrl: disciplineGroup.menuUrl,
//               classTime: disciplineGroup.classTime,

//               teacher: {
//                 id: teacher.id,
//                 userId: teacher.userId,
//                 createdAt: teacher.createdAt,
//                 updatedAt: teacher.updatedAt,
//               },
//               teacherId: teacher.id,
//               disciplineId: disciplineGroup.disciplineId,

//               createdAt: disciplineGroup.createdAt,
//               updatedAt: disciplineGroup.updatedAt,
//             },
//           ],
//           createdAt: discipline.createdAt,
//           updatedAt: discipline.updatedAt,
//         },
//       ],
//       total: 1,
//     })
//   })
// })
