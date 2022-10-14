import { db } from '@/config/firebase'
import {
  DisciplineGroupMapper,
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
  limit as limitFirestore,
  getDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore'

import {
  ICreatePostEndpoint,
  IGetDisciplineGroupEndpoint,
  IGetDisciplineGroupsEndpoint,
  IGetDisciplineGroupPostsEndpoint,
  IGetDisciplineGroupMessagesEndpoint,
  IDisciplineGroupMessageListener,
  IGetMyLastMessagesEndpoint,
  ISubscribeStudentEndpoint,
  IUnsubscribeStudentEndpoint,
} from './types'

export const getDisciplineGroups = async ({
  query,
  page,
  limit,
}: IGetDisciplineGroupsEndpoint.Request): Promise<IGetDisciplineGroupsEndpoint.Response> => {
  const response = await api.get('/discipline-groups', {
    params: {
      studentIds_has: query?.studentId || undefined,
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

  const lastCursor =
    querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1]
      : undefined

  const disciplineGroupMessages = DisciplineGroupMessageMapper.toEntityList(
    querySnapshot.docs.map(doc => doc.data()),
  )

  return {
    results: disciplineGroupMessages,
    nextCursor: lastCursor?.id,
  }
}

export const disciplineGroupMessageListener = (
  { disciplineGroupId }: IDisciplineGroupMessageListener.Params,
  callback: IDisciplineGroupMessageListener.Callback,
): (() => void) => {
  const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  const collectionRef = collection(docRef, 'messages')

  const queryRef = query(
    collectionRef,
    orderBy('sentAt', 'desc'),
    limitFirestore(1),
  )

  const unsubscribe = onSnapshot(queryRef, querySnapshot => {
    const disciplineGroupMessages = DisciplineGroupMessageMapper.toEntityList(
      querySnapshot.docs.map(doc => doc.data()),
    )

    callback(disciplineGroupMessages)
  })

  return unsubscribe
}

export const createPost = async (
  { disciplineGroupId }: ICreatePostEndpoint.Params,
  { content }: ICreatePostEndpoint.Body,
): Promise<void> => {
  await api.post(`/discipline-groups/${disciplineGroupId}/posts`, { content })
}
