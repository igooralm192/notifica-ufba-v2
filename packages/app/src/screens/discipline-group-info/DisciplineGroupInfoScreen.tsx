import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'

import React, { useLayoutEffect, useMemo } from 'react'

import {
  useDisciplineGroupInfoPresenter,
  withDisciplineGroupInfoPresenter,
} from './DisciplineGroupInfoPresenter'
import {
  Container,
  ScrollContainer,
  InitialLetterContainer,
  InitialLetter,
  TitleContainer,
  DisciplineCode,
  GroupCode,
  Name,
  DescriptionContainer,
  DescriptionLabel,
  Description,
  TeacherContainer,
  TeacherLabel,
  TeacherName,
  MenuContainer,
  MenuLabel,
  MenuUrl,
  ClassSchedulesContainer,
  ClassSchedulesLabel,
  ClassSchedule,
  ButtonContainer,
  SubscribeButton,
} from './DisciplineGroupInfoStyles'

const DisciplineGroupInfoScreen: React.FC = () => {
  const { disciplineGroup, subscribing, subscribeStudent } =
    useDisciplineGroupInfoPresenter()

  const { user } = useMe()
  const statusBar = useStatusBar()

  const disciplineGroupCode = disciplineGroup?.code
  const disciplineCode = disciplineGroup?.discipline?.code
  const disciplineName = disciplineGroup?.discipline?.name

  const disciplineCodeFirstLetter = disciplineCode?.charAt(0).toUpperCase()

  const isSubscribed = useMemo(() => {
    if (!disciplineGroup?.studentIds || !user || !user.student?.id) return false

    return disciplineGroup.studentIds.includes(user.student.id)
  }, [disciplineGroup?.studentIds, user?.student?.id])

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  return (
    <Container
      headerProps={{
        title: `${disciplineCode} - ${disciplineGroupCode}`,
        subtitle: disciplineName,
        titleAlign: 'center',
      }}
    >
      <ScrollContainer>
        <InitialLetterContainer>
          <InitialLetter>{disciplineCodeFirstLetter}</InitialLetter>
        </InitialLetterContainer>

        <TitleContainer>
          <DisciplineCode>{disciplineCode}</DisciplineCode>
          <Name>{disciplineName}</Name>
          <GroupCode>{disciplineGroupCode}</GroupCode>
        </TitleContainer>

        <DescriptionContainer>
          <DescriptionLabel>Descrição</DescriptionLabel>
          <Description>{disciplineGroup?.description}</Description>
        </DescriptionContainer>

        <TeacherContainer>
          <TeacherLabel>Professor</TeacherLabel>
          <TeacherName>{disciplineGroup?.teacher?.user?.name}</TeacherName>
        </TeacherContainer>

        <MenuContainer>
          <MenuLabel>Link da ementa</MenuLabel>
          <MenuUrl>{disciplineGroup?.menuUrl}</MenuUrl>
        </MenuContainer>

        <ClassSchedulesContainer>
          <ClassSchedulesLabel>Horários</ClassSchedulesLabel>
          <ClassSchedule>{disciplineGroup?.classTime.toString()}</ClassSchedule>
        </ClassSchedulesContainer>
      </ScrollContainer>

      {(
        <ButtonContainer>
          <SubscribeButton
            title="Inscrever-se"
            loading={subscribing}
            disabled={subscribing}
            onPress={() => subscribeStudent()}
            // loadingProps={{ testID: 'login-loading' }}
          />
        </ButtonContainer>
      )}
    </Container>
  )
}

export default withDisciplineGroupInfoPresenter(DisciplineGroupInfoScreen)
