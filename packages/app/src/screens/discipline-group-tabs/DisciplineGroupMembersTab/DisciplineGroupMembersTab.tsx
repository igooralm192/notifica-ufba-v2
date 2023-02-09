import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'

import { useTheme } from '@rneui/themed'
import React, { useMemo } from 'react'
import { RefreshControl, SectionList } from 'react-native'

import { DisciplineGroupMemberListItem } from './DisciplineGroupMemberListItem'
import {
  useDisciplineGroupMembersPresenter,
  withDisciplineGroupMembersPresenter,
} from './DisciplineGroupMembersPresenter'
import { SectionTitle } from './DisciplineGroupMembersStyles'

export interface DisciplineGroupMembersTabProps {}

const DisciplineGroupMembersTab: React.FC<
  DisciplineGroupMembersTabProps
> = () => {
  const { theme } = useTheme()
  const { user } = useMe()

  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroupMembers,
    onNextPage,
    onRefresh,
  } = useDisciplineGroupMembersPresenter()

  const teacherMembers = useMemo(
    () => disciplineGroupMembers.filter(m => m.userType === 'TEACHER'),
    [disciplineGroupMembers],
  )

  const studentMembers = useMemo(
    () => disciplineGroupMembers.filter(m => m.userType === 'STUDENT'),
    [disciplineGroupMembers],
  )

  const sections = [
    { title: 'Professores', data: teacherMembers },
    { title: 'Estudantes', data: studentMembers },
  ]

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={({ section }) => (
        <SectionTitle>{section.title}</SectionTitle>
      )}
      renderItem={({ item }) => (
        <DisciplineGroupMemberListItem disciplineGroupMember={item} />
      )}
      ItemSeparatorComponent={Spacer}
      SectionSeparatorComponent={() => <Spacer s={8} />}
      stickySectionHeadersEnabled={false}
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
  )
}

export default withDisciplineGroupMembersPresenter(DisciplineGroupMembersTab)
