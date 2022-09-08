import { useAuth } from '@/contexts/auth'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import React, { useLayoutEffect } from 'react'

import {
  useDisciplineGroupPostsPresenter,
  withDisciplineGroupPostsPresenter,
} from './DisciplineGroupPostsPresenter'
import { Container } from './DisciplineGroupPostsStyles'

const DisciplineGroupPostsScreen: React.FC = () => {
  const presenter = useDisciplineGroupPostsPresenter()

  const disciplineGroup = presenter.disciplineGroup
  const discipline = presenter.disciplineGroup?.discipline

  const auth = useAuth()
  const navigation = useNavigation()
  const statusBar = useStatusBar()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${discipline?.code} - ${disciplineGroup?.code}`,
    })
    statusBar.setTheme('primary')
  }, [])

  return <Container></Container>
}

export default withDisciplineGroupPostsPresenter(DisciplineGroupPostsScreen)
