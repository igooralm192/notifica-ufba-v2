import { IDiscipline } from '@shared/entities'

import { useNavigation } from '@/helpers'

import { ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  DisciplineCode,
  DisciplineName,
  DisciplineGroupCode,
  DisciplineGroupTeacher,
} from './DisciplinesListItemStyles'

export interface DisciplinesListItemProps {
  discipline: IDiscipline
}

const DisciplinesListItem: React.FC<DisciplinesListItemProps> = ({
  discipline,
}) => {
  const navigation = useNavigation()
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
      {discipline.groups?.map(group => (
        <ListItem
          key={group.id}
          containerStyle={{ paddingHorizontal: 16 }}
          onPress={() =>
            navigation.navigate('DisciplineGroupInfoScreen', {
              disciplineGroupId: group.id,
            })
          }
        >
          <ListItem.Content>
            <DisciplineGroupCode>{group.code}</DisciplineGroupCode>
            <DisciplineGroupTeacher>
              {group.teacher?.user?.name}
            </DisciplineGroupTeacher>
          </ListItem.Content>
        </ListItem>
      ))}
    </ListItem.Accordion>
  )
}

export default DisciplinesListItem
