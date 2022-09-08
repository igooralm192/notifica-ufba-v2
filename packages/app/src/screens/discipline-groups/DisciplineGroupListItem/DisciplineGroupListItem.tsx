import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { Spacer } from '@/components/Spacer'
import { useNavigation } from '@/helpers'

import { Icon, ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import {
  Container,
  LeftContainer,
  LeftTopContainer,
  LeftBottomContainer,
  RightContainer,
  DisciplineCode,
  DisciplineGroupCode,
  DisciplineName,
  DisciplineGroupTeacher,
} from './DisciplineGroupListItemStyles'

export interface DisciplineGroupListItemProps {
  disciplineGroup: IDisciplineGroup
}

const DisciplineGroupListItem: React.FC<DisciplineGroupListItemProps> = ({
  disciplineGroup,
}) => {
  const navigation = useNavigation()

  return (
    <Container
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsScreen', {
          disciplineGroupId: disciplineGroup.id,
        })
      }
    >
      <LeftContainer>
        <LeftTopContainer>
          <DisciplineCode>
            {disciplineGroup.discipline?.code} - {disciplineGroup.code}
          </DisciplineCode>
          <DisciplineName>{disciplineGroup.discipline?.name}</DisciplineName>
        </LeftTopContainer>

        <Spacer />

        <LeftBottomContainer>
          <DisciplineGroupTeacher>
            {disciplineGroup.teacher?.user?.name}
          </DisciplineGroupTeacher>
        </LeftBottomContainer>
      </LeftContainer>

      <RightContainer>
        <Icon name="more-vert" />
      </RightContainer>
    </Container>
  )
}

export default DisciplineGroupListItem
