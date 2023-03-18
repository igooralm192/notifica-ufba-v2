import { IDiscipline, IDisciplineGroup } from '@shared/entities'
import { ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  DisciplineCode,
  DisciplineName,
  DisciplineGroupCode,
  DisciplineGroupTeacher,
} from './styles'

export interface SearchGroupsItemProps {
  discipline: IDiscipline
  onDisciplineGroupPress: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

export const SearchGroupsItem: React.FC<SearchGroupsItemProps> = ({
  discipline,
  onDisciplineGroupPress,
}) => {
  const [expanded, setExpanded] = useState(false)

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
        return (
          <ListItem
            key={group.id}
            containerStyle={{ paddingHorizontal: 16 }}
            disabledStyle={{ opacity: 0.5 }}
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
