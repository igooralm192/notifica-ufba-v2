import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { useTabBarHeight } from '@/hooks'
import { SpeedDial, useTheme } from '@rneui/themed'

import React from 'react'
import { FlatList, Platform, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

  const tabBarHeight = useTabBarHeight()
  const { theme } = useTheme()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const [open, setOpen] = React.useState(false)

  const showMenu = () => setOpen(true)
  const hideMenu = () => setOpen(false)

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Suas turmas', back: false }}>
      <FlatList
        data={disciplineGroups}
        renderItem={({ item }) => (
          <DisciplineGroupListItem disciplineGroup={item} />
        )}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{
          padding: 16,
          // Safe area bottom + safe area bottom tab padding + bottom tab height + list padding bottom
          paddingBottom: insets.bottom + 20 + 70 + 16,
        }}
        onEndReached={onNextPage}
        onEndReachedThreshold={0.15}
        ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
        refreshControl={
          <RefreshControl
            refreshing={!isFetchingMore && isRefreshing}
            onRefresh={onRefresh}
          />
        }
        style={{ backgroundColor: theme.colors.grey1 }}
      />

      <SpeedDial
        isOpen={open}
        icon={{ name: 'menu', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={showMenu}
        onClose={hideMenu}
        color={theme.colors.primary}
        containerStyle={{
          marginBottom: tabBarHeight + (Platform.OS === 'ios' ? 20 : 40),
        }}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff' }}
          color={theme.colors.primary}
          title="Criar turma"
          onPress={() => {
            navigation.navigate('CreateGroupScreen', {})
            hideMenu()
          }}
        />
        <></>
      </SpeedDial>
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
