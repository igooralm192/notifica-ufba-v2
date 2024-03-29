import { IDisciplineGroupMessage } from '@shared/entities'

import { db } from '@/config/firebase'
import {
  DisciplineGroupMapper,
  DisciplineGroupMemberMapper,
  DisciplineGroupMessageMapper,
  DisciplineGroupPostMapper,
  LastMessageMapper,
} from '@/mappers'
import { api } from '@/services/api'

import {
  collection,
  doc,
  orderBy,
  query,
  startAfter,
  endBefore,
  limit as limitFirestore,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'

import {
  ICreatePostEndpoint,
  ICreateMessageEndpoint,
  IGetDisciplineGroupEndpoint,
  IGetDisciplineGroupsEndpoint,
  IGetDisciplineGroupPostsEndpoint,
  IGetDisciplineGroupMembersEndpoint,
  IGetDisciplineGroupMessagesEndpoint,
  IAddedMessagesListener,
  IRemovedMessagesListener,
  IGetMyLastMessagesEndpoint,
  ISubscribeStudentEndpoint,
  IUnsubscribeStudentEndpoint,
  IDeleteMessageEndpoint,
  IDeleteDisciplineGroupEndpoint,
  IDeleteDisciplineGroupPostEndpoint,
  IRemoveDisciplineGroupStudentEndpoint,
} from './types'

export const getDisciplineGroups = async ({
  query,
  page,
  limit,
}: IGetDisciplineGroupsEndpoint.Request): Promise<IGetDisciplineGroupsEndpoint.Response> => {
  const response = await api.get('/discipline-groups', {
    params: {
      'or[0][discipline][code_contains]': query?.search,
      'or[1][discipline][name_contains]': query?.search,
      'studentIds[]': query?.studentId || undefined,
      teacherId: query?.teacherId,
      page,
      limit,
    },
  })

  return {
    results: DisciplineGroupMapper.toEntityList(response.data.results),
    total: response.data.total,
  }
}

export const getDisciplineGroupPosts = async (
  disciplineGroupId: string,
  { page, limit }: IGetDisciplineGroupPostsEndpoint.Request,
): Promise<IGetDisciplineGroupPostsEndpoint.Response> => {
  const response = await api.get(
    `/discipline-groups/${disciplineGroupId}/posts`,
    {
      params: {
        page,
        limit,
      },
    },
  )

  return {
    results: DisciplineGroupPostMapper.toEntityList(response.data.results),
    total: response.data.total,
  }
}

export const getMyLastMessages = async ({
  page,
  limit,
}: IGetMyLastMessagesEndpoint.Request): Promise<IGetMyLastMessagesEndpoint.Response> => {
  const response = await api.get('/discipline-groups/last-messages', {
    params: {
      page,
      limit,
    },
  })

  return {
    results: LastMessageMapper.toDTOList(response.data.results),
    total: response.data.total,
  }
}

export const subscribeStudent = async ({
  disciplineGroupId,
}: ISubscribeStudentEndpoint.Request): Promise<void> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/subscribe`)
}

export const unsubscribeStudent = async ({
  disciplineGroupId,
}: IUnsubscribeStudentEndpoint.Request): Promise<void> => {
  await api.delete(`/discipline-groups/${disciplineGroupId}/subscribe`)
}

export const getDisciplineGroup = async (
  disciplineGroupId: string,
): Promise<IGetDisciplineGroupEndpoint.Response> => {
  const response = await api.get(`/discipline-groups/${disciplineGroupId}`)

  return {
    disciplineGroup: DisciplineGroupMapper.toEntity(
      response.data.disciplineGroup,
    ),
  }
}

export const getDisciplineGroupMessages = async (
  { disciplineGroupId }: IGetDisciplineGroupMessagesEndpoint.Params,
  { nextCursor, limit = 10 }: IGetDisciplineGroupMessagesEndpoint.Query,
): Promise<IGetDisciplineGroupMessagesEndpoint.Response> => {
  const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  const collectionRef = collection(docRef, 'messages')

  const nextDocument = nextCursor
    ? await getDoc(doc(collectionRef, nextCursor))
    : undefined

  const queryRef = nextDocument
    ? query(
        collectionRef,
        orderBy('sentAt', 'desc'),
        startAfter(nextDocument),
        limitFirestore(limit),
      )
    : query(collectionRef, orderBy('sentAt', 'desc'), limitFirestore(limit))

  const querySnapshot = await getDocs(queryRef)

  const lastDocument =
    querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : undefined
  
  const disciplineGroupMessages = DisciplineGroupMessageMapper.toEntityList(
    querySnapshot.docs.map(doc => doc.data()),
  )

  return {
    results: disciplineGroupMessages,
    nextCursor: lastDocument ? lastDocument.id : undefined,
  }
}

export const addedMessagesListener = (
  { disciplineGroupId }: IAddedMessagesListener.Params,
  { from }: IAddedMessagesListener.Query,
  callback: IAddedMessagesListener.Callback,
): (() => void) => {
  const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  const collectionRef = collection(docRef, 'messages')

  const queryRef = from
    ? query(
        collectionRef,
        orderBy('sentAt', 'desc'),
        endBefore(Timestamp.fromDate(from)),
      )
    : query(collectionRef, orderBy('sentAt', 'desc'))


  const unsubscribe = onSnapshot(queryRef, querySnapshot => {
    const addedDocs = querySnapshot
      .docChanges()
      .filter(change => change.type === 'added')
      .map(change => change.doc.data())

    if (addedDocs.length > 0) {
      callback?.(DisciplineGroupMessageMapper.toEntityList(addedDocs))
    }
  })

  return unsubscribe
}

export const removedMessagesListener = (
  { disciplineGroupId }: IRemovedMessagesListener.Params,
  callback: IRemovedMessagesListener.Callback,
): (() => void) => {
  const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  const collectionRef = collection(docRef, 'messages')

  const queryRef = query(collectionRef, orderBy('sentAt', 'desc'))

  const unsubscribe = onSnapshot(queryRef, querySnapshot => {
    const removedDocs = querySnapshot
      .docChanges()
      .filter(change => change.type === 'removed')
      .map(change => change.doc.data())

    if (removedDocs.length > 0) {
      callback?.(DisciplineGroupMessageMapper.toEntityList(removedDocs))
    }
  })

  return unsubscribe
}

export const createMessage = async (
  { disciplineGroupId, userId, userName }: ICreateMessageEndpoint.Params,
  { message }: ICreateMessageEndpoint.Body,
) => {
  const docId = 'any-string' + Date.now()

  const docRef = doc(
    db,
    'disciplineGroupMessages',
    disciplineGroupId,
    'messages',
    docId,
  )

  const newMessage: IDisciplineGroupMessage = {
    id: docId,
    body: message,
    sentBy: userName,
    sentById: userId,
    sentAt: new Date(),
    disciplineGroupId,
  }

  await setDoc(docRef, DisciplineGroupMessageMapper.toDocument(newMessage))

  api.post(`/discipline-groups/${disciplineGroupId}/messages`, {
    message,
    onlyNotify: true,
  })
}

export const deleteMessage = async ({
  disciplineGroupId,
  messageId,
}: IDeleteMessageEndpoint.Params) => {
  const docRef = doc(
    db,
    'disciplineGroupMessages',
    disciplineGroupId,
    'messages',
    messageId,
  )

  await deleteDoc(docRef)
}

export const createPost = async (
  { disciplineGroupId }: ICreatePostEndpoint.Params,
  { content }: ICreatePostEndpoint.Body,
): Promise<void> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/posts`, { content })
}

export const deleteDisciplineGroup = async (
  { disciplineGroupId }: IDeleteDisciplineGroupEndpoint.Params,
): Promise<void> => {
  await api.delete(`/discipline-groups/${disciplineGroupId}`)
}

export const deleteDisciplineGroupPost = async ({
  disciplineGroupId,
  disciplineGroupPostId
}: IDeleteDisciplineGroupPostEndpoint.Params): Promise<void> => {
  await api.delete(`/discipline-groups/${disciplineGroupId}/posts/${disciplineGroupPostId}`)
}

export const getDisciplineGroupMembers = async (
  params: IGetDisciplineGroupMembersEndpoint.Params,
): Promise<IGetDisciplineGroupMembersEndpoint.Response> => {
  const { disciplineGroupId } = params

  const response = await api.get(
    `/discipline-groups/${disciplineGroupId}/members`,
  )

  return {
    members: DisciplineGroupMemberMapper.toDTOList(response.data),
  }
}

export const removeDisciplineGroupStudent = async ({
  disciplineGroupId,
  studentId,
}: IRemoveDisciplineGroupStudentEndpoint.Params): Promise<void> => {
  await api.delete(
    `/discipline-groups/${disciplineGroupId}/students/${studentId}`,
  )
}
