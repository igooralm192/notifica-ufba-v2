import { Spacer } from '@/components/Spacer'
import { FooterLoading } from '@/components/FooterLoading'
import { useStatusBar } from '@/contexts/status-bar'

import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import {
  useDisciplinePresenter,
  withDisciplinePresenter,
} from './DisciplinePresenter'
import { DisciplinesListItem } from './DisciplinesListItem'
import { Container } from './DisciplinesStyles'

const DisciplinesScreen: React.FC = () => {
  const { isFetchingMore, isRefreshing, disciplines, onNextPage, onRefresh } =
    useDisciplinePresenter()

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Disciplinas', back: false }}>
      <FlatList
        data={disciplines}
        renderItem={({ item }) => <DisciplinesListItem discipline={item} />}
        ItemSeparatorComponent={Spacer}
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
    </Container>
  )
}

export default withDisciplinePresenter(DisciplinesScreen)
