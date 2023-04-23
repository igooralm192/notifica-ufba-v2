import { api } from '@/services/api'

import * as disciplineApi from './discipline'
import * as disciplineGroupApi from './discipline-group'
import * as experimentApi from './experiment'
import * as studentApi from './student'
import * as teacherApi from './teacher'
import * as userApi from './user'

export default {
  instance: api,
  discipline: disciplineApi,
  disciplineGroup: disciplineGroupApi,
  experiment: experimentApi,
  student: studentApi,
  teacher: teacherApi,
  user: userApi,
}
