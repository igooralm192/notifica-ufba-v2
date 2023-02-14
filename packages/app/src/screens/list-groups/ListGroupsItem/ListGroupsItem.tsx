import { IDiscipline, IDisciplineGroup } from '@shared/entities'
import { useMe } from '@/contexts/me'

import { ListItem, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import {
  DisciplineCode,
  DisciplineName,
  DisciplineGroupCode,
  DisciplineGroupTeacher,
} from './ListGroupsItemStyles'

export interface ListGroupsItemProps {
  discipline: IDiscipline
  onDisciplineGroupPress: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

const ListGroupsItem: React.FC<ListGroupsItemProps> = ({
  discipline,
  onDisciplineGroupPress,
}) => {
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
      {discipline.groups?.map(group => {
        const isMember = isStudentMember(group) || isTeacherMember(group)

        return (
          <ListItem
            key={group.id}
            containerStyle={{ paddingHorizontal: 16 }}
            disabled={isMember}
            disabledStyle={{ opacity: 0.5 }}
            onPress={() => onDisciplineGroupPress(discipline, group)}
          >
            <ListItem.Content>
              <DisciplineGroupCode>{group.code}</DisciplineGroupCode>
              <DisciplineGroupTeacher>
                {group.teacher?.user?.name}
              </DisciplineGroupTeacher>
            </ListItem.Content>

            {isMember && (
              <ListItem.Chevron
                name="check-circle"
                color={theme.colors.primary}
                size={20}
              />
            )}
          </ListItem>
        )
      })}
    </ListItem.Accordion>
  )
}

export default ListGroupsItem
