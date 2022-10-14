import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'

import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { DisciplineGroupListItem } from './DisciplineGroupListItem'
import {
  useDisciplineGroupsPresenter,
  withDisciplineGroupsPresenter,
} from './DisciplineGroupsPresenter'
import { Container, ListContainer } from './DisciplineGroupsStyles'

export interface DisciplineGroupsScreenProps {}

const DisciplineGroupsScreen: React.FC<DisciplineGroupsScreenProps> = () => {
  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroups,
    onNextPage,
    onRefresh,
  } = useDisciplineGroupsPresenter()

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Turmas', back: false }}>
      <ListContainer>
        <FlatList
          data={disciplineGroups}
          renderItem={({ item }) => (
            <DisciplineGroupListItem disciplineGroup={item} />
          )}
          ItemSeparatorComponent={Spacer}
          contentContainerStyle={{ padding: 16 }}
          onEndReached={onNextPage}
          onEndReachedThreshold={0.15}
          ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
          refreshControl={
            <RefreshControl
              refreshing={!isFetchingMore && isRefreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </ListContainer>
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
