import { db } from '@/config/firebase'
import {
  DisciplineGroupMapper,
  DisciplineGroupMessageMapper,
  DisciplineGroupPostMapper,
  LastMessageMapper,
} from '@/mappers'
import { api } from '@/services/api'
import { delay } from '@/utils/delay'

import { collection, doc, orderBy, query, getDocs } from 'firebase/firestore'

import {
  IGetDisciplineGroupEndpoint,
  IGetDisciplineGroupsEndpoint,
  IGetDisciplineGroupPostsEndpoint,
  IGetDisciplineGroupMessagesEndpoint,
  IGetMyLastMessagesEndpoint,
  ISubscribeStudentEndpoint,
} from './types'

export const getDisciplineGroups = async ({
  query,
  page,
  limit,
}: IGetDisciplineGroupsEndpoint.Request): Promise<IGetDisciplineGroupsEndpoint.Response> => {
  console.log('GET DISCIPLINE GROUPS')
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
  disciplineGroupId: string,
  { page, limit }: IGetDisciplineGroupPostsEndpoint.Request,
): Promise<IGetDisciplineGroupMessagesEndpoint.Response> => {
  const docRef = doc(db, 'disciplineGroupMessages', disciplineGroupId)
  const collectionRef = collection(docRef, 'messages')
  const queryRef = query(collectionRef, orderBy('sentAt', 'desc'))

  const querySnapshot = await getDocs(queryRef)

  return {
    results: DisciplineGroupMessageMapper.toEntityList(
      querySnapshot.docs.map(doc => doc.data()),
    ),
    total: querySnapshot.size,
  }
}
