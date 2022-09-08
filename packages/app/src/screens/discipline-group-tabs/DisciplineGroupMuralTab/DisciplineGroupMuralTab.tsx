import { IDisciplineGroupPost } from '@shared/entities'
import { FullLoading } from '@/components/FullLoading'
import { Spacer } from '@/components/Spacer'

import { useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList } from 'react-native'

import { DisciplineGroupPostListItem } from './DisciplineGroupPostListItem'
import {
  useDisciplineGroupMuralPresenter,
  withDisciplineGroupMuralPresenter,
} from './DisciplineGroupMuralPresenter'

export interface DisciplineGroupMuralTabProps {}

const DisciplineGroupMuralTab: React.FC<DisciplineGroupMuralTabProps> = () => {
  const { theme } = useTheme()

  const { loadingPosts, disciplineGroupPosts } =
    useDisciplineGroupMuralPresenter()

  const renderDisciplineGroupPostListItem = ({
    item,
  }: {
    item: IDisciplineGroupPost
  }) => {
    return <DisciplineGroupPostListItem disciplineGroupPost={item} />
  }

  return (
    <FullLoading loading={loadingPosts}>
      <FlatList
        style={{ backgroundColor: theme.colors.grey1 }}
        data={disciplineGroupPosts.results}
        renderItem={renderDisciplineGroupPostListItem}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16 }}
      />
    </FullLoading>
  )
}

export default withDisciplineGroupMuralPresenter(DisciplineGroupMuralTab)
