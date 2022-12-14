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
  UnsubscribeButton,
} from './DisciplineGroupInfoStyles'

const DisciplineGroupInfoScreen: React.FC = () => {
  const {
    subscribing,
    unsubscribing,
    disciplineGroup,
    subscribeStudent,
    unsubscribeStudent,
  } = useDisciplineGroupInfoPresenter()

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
          <DescriptionLabel>Descri????o</DescriptionLabel>
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
          <ClassSchedulesLabel>Hor??rios</ClassSchedulesLabel>
          <ClassSchedule>{disciplineGroup?.classTime.toString()}</ClassSchedule>
        </ClassSchedulesContainer>
      </ScrollContainer>

      {user?.type === 'STUDENT' && (
        <>
          {!isSubscribed ? (
            <ButtonContainer>
              <SubscribeButton
                title="Inscrever-se"
                loading={subscribing}
                disabled={subscribing}
                onPress={() => subscribeStudent()}
                // loadingProps={{ testID: 'login-loading' }}
              />
            </ButtonContainer>
          ) : (
            <ButtonContainer>
              <UnsubscribeButton
                color="error"
                title="Desinscrever-se"
                loading={unsubscribing}
                disabled={unsubscribing}
                onPress={() => unsubscribeStudent()}
                // loadingProps={{ testID: 'login-loading' }}
              />
            </ButtonContainer>
          )}
        </>
      )}
    </Container>
  )
}

export default withDisciplineGroupInfoPresenter(DisciplineGroupInfoScreen)
