import { IDisciplineGroupMessage } from '@shared/entities'
import {
  ICreateDisciplineGroupMessageRepository,
  IDeleteAllDisciplineGroupMessageRepository,
  IFindAllDisciplineGroupMessageRepository,
} from '@/data/contracts'
import { FirestoreRepository } from '@/infra/database/firestore/helpers'

import { DocumentData } from 'firebase-admin/firestore'
import { ObjectId } from 'mongodb'

export class FirestoreDisciplineGroupMessageRepository
  extends FirestoreRepository
  implements
    ICreateDisciplineGroupMessageRepository,
    IFindAllDisciplineGroupMessageRepository,
    IDeleteAllDisciplineGroupMessageRepository
{
  async create({
    body,
    sentBy,
    sentById,
    disciplineGroupId,
  }: ICreateDisciplineGroupMessageRepository.Input): Promise<ICreateDisciplineGroupMessageRepository.Output> {
    const disciplineGroupMessage: IDisciplineGroupMessage = {
      id: new ObjectId().toString(),
      body: body,
      sentBy: sentBy,
      sentById: sentById,
      disciplineGroupId: disciplineGroupId,
      sentAt: new Date(),
    }

    await this.client
      .collection('disciplineGroupMessages')
      .doc(disciplineGroupId)
      .collection('messages')
      .doc()
      .set(disciplineGroupMessage)

    return disciplineGroupMessage
  }

  async deleteAll(
    input: IDeleteAllDisciplineGroupMessageRepository.Input,
  ): Promise<IDeleteAllDisciplineGroupMessageRepository.Output> {
    const { where } = input

    await this.deleteCollection(
      this.client
        .collection('disciplineGroupMessages')
        .doc(where.disciplineGroupId)
        .collection('messages'),
      20,
    )

    await this.client
      .collection('disciplineGroupMessages')
      .doc(where.disciplineGroupId)
      .delete()
  }

  async findAll(
    input: IFindAllDisciplineGroupMessageRepository.Input,
  ): Promise<IFindAllDisciplineGroupMessageRepository.Output> {
    const { take, skip, where } = input

    let query = this.client
      .collection('disciplineGroupMessages')
      .doc(where.disciplineGroupId)
      .collection('messages')
      .orderBy('sentAt', 'desc')

    if (take) query = query.limit(take)
    if (skip) query = query.offset(skip)

    return query.get().then(snapshot => {
      const disciplineGroupMessages = snapshot.docs.map(doc => doc.data())

      return disciplineGroupMessages.map(
        this.mapDocumentDataToDisciplineGroupMessage,
      )
    })
  }

  private mapDocumentDataToDisciplineGroupMessage(
    data: DocumentData,
  ): IDisciplineGroupMessage {
    return {
      id: data.id,
      body: data.body,
      sentBy: data.sentBy,
      sentById: data.sentById,
      disciplineGroupId: data.disciplineGroupId,
      sentAt: data.sentAt.toDate(),
    }
  }

  private async deleteCollection(
    collectionRef: FirebaseFirestore.CollectionReference<DocumentData>,
    batchSize: number,
  ) {
    const query = collectionRef.orderBy('__name__').limit(batchSize)

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject)
    })
  }

  private async deleteQueryBatch(
    query: FirebaseFirestore.Query<DocumentData>,
    resolve: (_: unknown) => void,
  ) {
    const snapshot = await query.get()

    const batchSize = snapshot.size
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve({})
      return
    }

    // Delete documents in a batch
    const batch = this.client.batch()
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref)
    })

    await batch.commit()

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this.deleteQueryBatch(query, resolve)
    })
  }
}
