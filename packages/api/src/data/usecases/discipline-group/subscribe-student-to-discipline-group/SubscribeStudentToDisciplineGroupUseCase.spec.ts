// import {
//   DisciplineGroupDoesNotExistError,
//   StudentDoesNotExistError,
// } from '@/domain/errors'
// import { mockStudent, mockDisciplineGroup } from '@/domain/mocks'

// import {
//   MockedDisciplineGroupRepository,
//   MockedStudentRepository,
// } from '@/data/mocks/repositories'

// import { SubscribeStudentToDisciplineGroupUseCase } from './SubscribeStudentToDisciplineGroupUseCase'

// const makeSUT = () => {
//   const student = mockStudent()
//   const disciplineGroup = mockDisciplineGroup()

//   const subscribeStudentInput = {
//     disciplineGroupId: disciplineGroup.id,
//     studentId: student.id,
//   }

//   const studentRepository = new MockedStudentRepository()
//   const disciplineGroupRepository = new MockedDisciplineGroupRepository()
//   const subscribeStudentUsecase = new SubscribeStudentToDisciplineGroupUseCase(
//     disciplineGroupRepository,
//     studentRepository,
//     disciplineGroupRepository,
//   )

//   const findOneDisciplineGroupSpy = jest.spyOn(
//     disciplineGroupRepository,
//     'findOne',
//   )
//   findOneDisciplineGroupSpy.mockResolvedValue(disciplineGroup)

//   const findOneStudentSpy = jest.spyOn(studentRepository, 'findOne')
//   findOneStudentSpy.mockResolvedValue(student)

//   const pushStudentSpy = jest.spyOn(disciplineGroupRepository, 'pushStudent')
//   pushStudentSpy.mockResolvedValue(disciplineGroup)

//   return {
//     SUT: subscribeStudentUsecase,
//     findOneDisciplineGroupSpy,
//     findOneStudentSpy,
//     pushStudentSpy,
//     student,
//     disciplineGroup,
//     subscribeStudentInput,
//   }
// }

// describe('SubscribeStudentToDisciplineGroupUseCase', () => {
//   it('should subscribe student to a discipline group', async () => {
//     const { SUT, subscribeStudentInput } = makeSUT()

//     const resultOrError = await SUT.run(subscribeStudentInput)
//     const result = resultOrError.right()

//     expect(result).toBeUndefined()
//   })

//   it('should call find one discipline group repository with correct params', async () => {
//     const { SUT, findOneDisciplineGroupSpy, subscribeStudentInput } = makeSUT()

//     await SUT.run(subscribeStudentInput)

//     expect(findOneDisciplineGroupSpy).toHaveBeenCalledWith({
//       id: subscribeStudentInput.disciplineGroupId,
//     })
//   })

//   it('should call find one student repository with correct params', async () => {
//     const { SUT, findOneStudentSpy, subscribeStudentInput } = makeSUT()

//     await SUT.run(subscribeStudentInput)

//     expect(findOneStudentSpy).toHaveBeenCalledWith({
//       id: subscribeStudentInput.studentId,
//     })
//   })

//   it('should call push student discipline group repository with correct params', async () => {
//     const { SUT, pushStudentSpy, subscribeStudentInput } = makeSUT()

//     await SUT.run(subscribeStudentInput)

//     expect(pushStudentSpy).toHaveBeenCalledWith({
//       disciplineGroupId: subscribeStudentInput.disciplineGroupId,
//       studentId: subscribeStudentInput.studentId,
//     })
//   })

//   it('should return error if discipline group does not exist', async () => {
//     const { SUT, findOneDisciplineGroupSpy, subscribeStudentInput } = makeSUT()

//     findOneDisciplineGroupSpy.mockResolvedValueOnce(null)

//     const resultOrError = await SUT.run(subscribeStudentInput)
//     const result = resultOrError.left()

//     expect(result).toBeInstanceOf(DisciplineGroupDoesNotExistError)
//   })

//   it('should return error if student does not exist', async () => {
//     const { SUT, findOneStudentSpy, subscribeStudentInput } = makeSUT()

//     findOneStudentSpy.mockResolvedValueOnce(null)

//     const resultOrError = await SUT.run(subscribeStudentInput)
//     const result = resultOrError.left()

//     expect(result).toBeInstanceOf(StudentDoesNotExistError)
//   })
// })
