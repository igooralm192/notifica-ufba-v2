import { Spacer } from '@/components/Spacer'

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
  const { isRefreshing, disciplineGroupMembers, onRefresh } =
    useDisciplineGroupMembersPresenter()

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
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  )
}

export default withDisciplineGroupMembersPresenter(DisciplineGroupMembersTab)
