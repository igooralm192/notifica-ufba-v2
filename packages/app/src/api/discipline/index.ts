import { DisciplineMapper } from '@/mappers'
import { api } from '@/services/api'

import { IGetDisciplinesEndpoint, ICreateGroupEndpoint } from './types'

export const getDisciplines = async ({
  page,
  limit,
  code,
}: IGetDisciplinesEndpoint.Request): Promise<IGetDisciplinesEndpoint.Response> => {
  const response = await api.get('/disciplines', {
    params: { page, limit, 'code_contains': code },
  })

  const { results, total } = response.data

  return {
    results: DisciplineMapper.toEntityList(results),
    total,
  }
}

export const createGroup = async (
  { disciplineId }: ICreateGroupEndpoint.Params,
  body: ICreateGroupEndpoint.Body,
): Promise<void> => {
  await api.post(`/disciplines/${disciplineId}/groups`, body)
}
