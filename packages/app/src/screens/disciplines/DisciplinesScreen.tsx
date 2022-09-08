import { IDiscipline } from '@shared/entities'

import { useStatusBar } from '@/contexts/status-bar'

import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import {
  useDisciplinePresenter,
  withDisciplinePresenter,
} from './DisciplinePresenter'
import { DisciplinesListItem } from './DisciplinesListItem'
import { Container } from './DisciplinesStyles'
import { Button } from '@rneui/themed'
import { useAuth } from '@/contexts/auth'
import { FullLoading } from '@/components/FullLoading'

export interface DisciplinesScreenProps {}

const DisciplinesScreen: React.FC<DisciplinesScreenProps> = props => {
  const auth = useAuth()
  const { disciplines } = useDisciplinePresenter()

  const statusBar = useStatusBar()

  const renderDisciplinesListItem = ({ item }: { item: IDiscipline }) => {
    return <DisciplinesListItem discipline={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  return (
    <Container headerProps={{ title: 'Disciplinas', back: false }}>
      <FlatList
        data={disciplines.results}
        renderItem={renderDisciplinesListItem}
      />

      <Button title={'Logout'} onPress={() => auth.logout()} />
    </Container>
  )
}

export default withDisciplinePresenter(DisciplinesScreen)
