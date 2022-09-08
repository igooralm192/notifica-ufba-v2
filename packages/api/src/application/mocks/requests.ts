import { ISubscribeStudentToDisciplineGroupController } from '@/application/controllers/discipline-group'

import faker from 'faker'

export const mockSubscribeStudentToDisciplineGroupBody =
  () => {
    return { }
  }

export const mockSubscribeStudentToDisciplineGroupParams =
  (): ISubscribeStudentToDisciplineGroupController.Params => {
    return { disciplineGroupId: faker.datatype.uuid() }
  }
