import { api } from '@/services/api'

import * as disciplineApi from './discipline'
import * as disciplineGroupApi from './discipline-group'
import * as studentApi from './student'
import * as userApi from './user'

export default {
  instance: api,
  discipline: disciplineApi,
  disciplineGroup: disciplineGroupApi,
  student: studentApi,
  user: userApi,
}
