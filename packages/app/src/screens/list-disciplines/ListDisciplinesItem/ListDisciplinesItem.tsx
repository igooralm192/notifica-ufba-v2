import { IDiscipline } from '@shared/entities'

import { ListItem } from '@rneui/themed'
import React from 'react'

import { DisciplineCode, DisciplineName } from './ListDisciplinesItemStyles'

export interface ListDisciplinesItemProps {
  discipline: IDiscipline
  onDisciplinePress: (discipline: IDiscipline) => void
}

const ListDisciplinesItem: React.FC<ListDisciplinesItemProps> = ({
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

export default ListDisciplinesItem
