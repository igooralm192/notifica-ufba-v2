import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import { FAB, Tab, TabView, useTheme } from '@rneui/themed'
import React, { useState } from 'react'

import { DisciplineGroupChatTab } from './DisciplineGroupChatTab'
import { DisciplineGroupMuralTab } from './DisciplineGroupMuralTab'
import {
  useDisciplineGroupTabsPresenter,
  withDisciplineGroupTabsPresenter,
} from './DisciplineGroupTabsPresenter'
import { Container } from './DisciplineGroupTabsStyles'

const DisciplineGroupTabsScreen: React.FC = () => {
  const { initialIndex, disciplineGroup, navigateToCreatePost } =
    useDisciplineGroupTabsPresenter()

  const { user } = useMe()
  const navigation = useNavigation()
  const { theme } = useTheme()

  const [index, setIndex] = useState(initialIndex)

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
        value={index}
        onChange={e => setIndex(e)}
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
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <DisciplineGroupMuralTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <DisciplineGroupChatTab />
        </TabView.Item>
      </TabView>

      <FAB
        visible={user?.type === 'TEACHER'}
        icon={{ name: 'add', color: 'white' }}
        color={theme.colors.primary}
        style={{ position: 'absolute', bottom: 30, right: 24 }}
        onPress={navigateToCreatePost}
      />
    </Container>
  )
}

export default withDisciplineGroupTabsPresenter(DisciplineGroupTabsScreen)
