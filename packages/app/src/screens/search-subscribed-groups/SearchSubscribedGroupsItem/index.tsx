import { IDiscipline, IDisciplineGroup } from '@shared/entities'
import { useMe } from '@/contexts/me'

import { ListItem, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import {
  DisciplineCode,
  DisciplineName,
  DisciplineGroupCode,
  DisciplineGroupTeacher,
} from './styles'

export interface SearchSubscribedGroupsItemProps {
  discipline: IDiscipline
  onDisciplineGroupPress: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

export const SearchSubscribedGroupsItem: React.FC<
  SearchSubscribedGroupsItemProps
> = ({ discipline, onDisciplineGroupPress }) => {
  const { user } = useMe()
  const { theme } = useTheme()

  const [expanded, setExpanded] = useState(false)

  const isStudentMember = (group: IDisciplineGroup) =>
    group.studentIds?.includes(user?.student?.id || '')

  const isTeacherMember = (group: IDisciplineGroup) =>
    group.teacherId === user?.teacher?.id

  return (
    <ListItem.Accordion
      isExpanded={expanded}
      containerStyle={{ paddingHorizontal: 16 }}
      content={
        <ListItem.Content>
          <DisciplineCode>{discipline.code}</DisciplineCode>
          <DisciplineName>{discipline.name}</DisciplineName>
        </ListItem.Content>
      }
      onPress={() => setExpanded(!expanded)}
    >
      {discipline.groups
        ?.filter(group => isStudentMember(group) || isTeacherMember(group))
        .map(group => {
          return (
            <ListItem
              key={group.id}
              containerStyle={{ paddingHorizontal: 16 }}
              onPress={() => onDisciplineGroupPress(discipline, group)}
            >
              <ListItem.Content>
                <DisciplineGroupCode>{group.code}</DisciplineGroupCode>
                <DisciplineGroupTeacher>
                  {group.teacher?.user?.name}
                </DisciplineGroupTeacher>
              </ListItem.Content>
            </ListItem>
          )
        })}
    </ListItem.Accordion>
  )
}
