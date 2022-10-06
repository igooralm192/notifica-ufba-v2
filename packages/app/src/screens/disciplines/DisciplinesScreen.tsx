import { Spacer } from '@/components/Spacer'
import { FooterLoading } from '@/components/FooterLoading'
import { useAuth } from '@/contexts/auth'
import { useStatusBar } from '@/contexts/status-bar'

import { Button } from '@rneui/themed'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import {
  useDisciplinePresenter,
  withDisciplinePresenter,
} from './DisciplinePresenter'
import { DisciplinesListItem } from './DisciplinesListItem'
import { Container } from './DisciplinesStyles'

const DisciplinesScreen: React.FC = () => {
  const auth = useAuth()

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

      <Button title={'Logout'} onPress={() => auth.logout()} />
    </Container>
  )
}

export default withDisciplinePresenter(DisciplinesScreen)
