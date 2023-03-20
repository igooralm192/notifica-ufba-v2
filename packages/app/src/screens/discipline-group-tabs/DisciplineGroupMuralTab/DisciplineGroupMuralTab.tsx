import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'

import { FAB, useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { DisciplineGroupPostListItem } from './DisciplineGroupPostListItem'
import {
  useDisciplineGroupMuralPresenter,
  withDisciplineGroupMuralPresenter,
} from './DisciplineGroupMuralPresenter'
import { AddDisciplineGroupPostPlaceholder } from './AddDisciplineGroupPostPlaceholder'

export interface DisciplineGroupMuralTabProps {}

const DisciplineGroupMuralTab: React.FC<DisciplineGroupMuralTabProps> = () => {
  const { theme } = useTheme()
  const { user } = useMe()

  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroupPosts,
    onNextPage,
    onRefresh,
    navigate
  } = useDisciplineGroupMuralPresenter()

  return (
    <>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={disciplineGroupPosts}
        renderItem={({ item }) => (
          <DisciplineGroupPostListItem
            key={item.id}
            disciplineGroupPost={item}
          />
        )}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={() => {
          const placeholderMap = {
            TEACHER: 'Ainda não há nada por aqui, crie já uma postagem.',
            STUDENT:
              'Ainda não há nada por aqui, aguarde o professor da turma postar algo.',
          }

          const buttonTitleMap = {
            TEACHER: 'Criar postagem',
            STUDENT: '',
          }

          const onAddDisciplineGroupMap = {
            TEACHER: navigate.toCreatePost,
            STUDENT: undefined,
          }

          return (
            <AddDisciplineGroupPostPlaceholder
              placeholder={placeholderMap[user?.type || 'STUDENT']}
              buttonTitle={buttonTitleMap[user?.type || 'STUDENT']}
              onAddDisciplineGroupPost={
                onAddDisciplineGroupMap[user?.type || 'STUDENT']
              }
            />
          )
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
      />
      {user?.type === 'TEACHER' && (
        <FAB
          icon={{ name: 'add', color: 'white' }}
          color={theme.colors.primary}
          style={{ position: 'absolute', bottom: 30, right: 24 }}
          onPress={navigate.toCreatePost}
        />
      )}
    </>
  )
}

export default withDisciplineGroupMuralPresenter(DisciplineGroupMuralTab)
