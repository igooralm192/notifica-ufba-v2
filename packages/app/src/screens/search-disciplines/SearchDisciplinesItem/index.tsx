import { IDiscipline } from '@shared/entities'

import { ListItem } from '@rneui/themed'
import React from 'react'

import { DisciplineCode, DisciplineName } from './styles'

export interface SearchDisciplinesItemProps {
  discipline: IDiscipline
  onDisciplinePress: (discipline: IDiscipline) => void
}

export const SearchDisciplinesItem: React.FC<SearchDisciplinesItemProps> = ({
  discipline,
  onDisciplinePress,
}) => {
  return (
    <ListItem
      key={discipline.id}
      containerStyle={{ paddingHorizontal: 16 }}
      onPress={() => onDisciplinePress(discipline)}
    >
      <ListItem.Content>
        <DisciplineCode>{discipline.code}</DisciplineCode>
        <DisciplineName>{discipline.name}</DisciplineName>
      </ListItem.Content>
    </ListItem>
  )
}
