import { IDisciplineGroup } from '@shared/entities'
import { FullLoading } from '@/components/FullLoading'
import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'

import React from 'react'
import { FlatList } from 'react-native'

import { DisciplineGroupListItem } from './DisciplineGroupListItem'
import {
  useDisciplineGroupsPresenter,
  withDisciplineGroupsPresenter,
} from './DisciplineGroupsPresenter'
import { Container, ListContainer } from './DisciplineGroupsStyles'

export interface DisciplineGroupsScreenProps {}

const DisciplineGroupsScreen: React.FC<DisciplineGroupsScreenProps> = () => {
  const { disciplineGroups } = useDisciplineGroupsPresenter()

  const renderDisciplineGroupListItem = ({
    item,
  }: {
    item: IDisciplineGroup
  }) => {
    return <DisciplineGroupListItem disciplineGroup={item} />
  }

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Turmas', back: false }}>
      <ListContainer>
        <FlatList
          data={disciplineGroups.results}
          renderItem={renderDisciplineGroupListItem}
          ItemSeparatorComponent={Spacer}
          contentContainerStyle={{ padding: 16 }}
        />
      </ListContainer>
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
