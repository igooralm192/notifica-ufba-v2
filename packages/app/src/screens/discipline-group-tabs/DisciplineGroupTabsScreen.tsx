import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import { Tab, TabView, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import { DisciplineGroupMuralTab } from './DisciplineGroupMuralTab'
import { DisciplineGroupChatTab } from './DisciplineGroupChatTab'
import { DisciplineGroupMembersTab } from './DisciplineGroupMembersTab'
import {
  useDisciplineGroupTabsPresenter,
  withDisciplineGroupTabsPresenter,
} from './DisciplineGroupTabsPresenter'
import { Container } from './DisciplineGroupTabsStyles'

const DisciplineGroupTabsScreen: React.FC = () => {
  const { disciplineGroup, tabs } = useDisciplineGroupTabsPresenter()

  const navigation = useNavigation()
  const { theme } = useTheme()

  useStatusBar('primary')

  const disciplineGroupCode = disciplineGroup?.code
  const disciplineCode = disciplineGroup?.discipline?.code
  const disciplineName = disciplineGroup?.discipline?.name

  return (
    <Container
      headerProps={{
        title: `${disciplineCode} - ${disciplineGroupCode}`,
        subtitle: disciplineName,
        titleAlign: 'center',
        rightAction: {
          icon: 'information-outline',
          onPress: () => {
            if (disciplineGroup)
              navigation.navigate('DisciplineGroupInfoScreen', {
                disciplineGroupId: disciplineGroup.id,
              })
          },
        },
      }}
    >
      <Tab
        value={tabs.currentIndex}
        onChange={tabs.onChangeIndex}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          containerStyle={{ backgroundColor: theme.colors.primary }}
          title="Mural"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'rss', type: 'material-community', color: 'white' }}
        />
        <Tab.Item
          containerStyle={{ backgroundColor: theme.colors.primary }}
          title="Chat"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'chat', type: 'material-community', color: 'white' }}
        />
        <Tab.Item
          containerStyle={{ backgroundColor: theme.colors.primary }}
          title="Membros"
          titleStyle={{ fontSize: 12 }}
          icon={{
            name: 'users',
            type: 'font-awesome-5',
            color: 'white',
          }}
        />
      </Tab>

      <TabView value={tabs.currentIndex} onChange={tabs.onChangeIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <DisciplineGroupMuralTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <DisciplineGroupChatTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <DisciplineGroupMembersTab />
        </TabView.Item>
      </TabView>
    </Container>
  )
}

export default withDisciplineGroupTabsPresenter(DisciplineGroupTabsScreen)
