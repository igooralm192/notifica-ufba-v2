// import { useFirestoreTestClient } from '@/infra/database/firestore/helpers'

// import faker from 'faker'
// import { Timestamp } from 'firebase-admin/firestore'
// import { ObjectId } from 'mongodb'

// import { FirestoreDisciplineGroupMessageRepository } from './FirestoreDisciplineGroupMessageRepository'

// const makeSUT = () => {
//   const SUT = new FirestoreDisciplineGroupMessageRepository()

//   return {
//     SUT,
//   }
// }

// describe('FirestoreDisciplineGroupMessageRepository', () => {
//   const getClient = useFirestoreTestClient()

//   describe('findAll', () => {
//     it('should return discipline group messages if id exist', async () => {
//       const { SUT } = makeSUT()

//       const disciplineGroupMessage = {
//         id: new ObjectId().toString(),
//         body: faker.random.words(),
//         disciplineGroupId: new ObjectId().toString(),
//         sentById: new ObjectId().toString(),
//         sentAt: Timestamp.fromDate(faker.date.recent()),
//       }

//       await getClient()
//         .collection('disciplineGroupMessages')
//         .doc()
//         .set(disciplineGroupMessage)

//       const findDisciplineGroupMessages = await SUT.findAll({
//         take: 1,
//         skip: 0,
//       })

//       expect(findDisciplineGroupMessages).toMatchObject({
//         results: [
//           {
//             id: disciplineGroupMessage.id,
//             body: disciplineGroupMessage.body,
//             disciplineGroupId: disciplineGroupMessage.disciplineGroupId,
//             sentById: disciplineGroupMessage.sentById,
//             sentAt: disciplineGroupMessage.sentAt.toDate(),
//           },
//         ],
//         total: 1,
//       })
//     })
//   })
// })
