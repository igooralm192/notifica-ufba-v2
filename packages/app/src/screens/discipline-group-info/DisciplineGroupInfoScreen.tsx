import { Stack } from '@/components/Stack'
import UserProfilePicture from '@/components/UserProfilePicture'
import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'

import { Icon } from '@rneui/themed'
import React, { useMemo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  useDisciplineGroupInfoPresenter,
  withDisciplineGroupInfoPresenter,
} from './DisciplineGroupInfoPresenter'
import {
  Container,
  TopContainer,
  BottomContainer,
  DisciplineGroupContainer,
  DisciplineContainer,
  GroupContainer,
  DisciplineCode,
  DisciplineName,
  GroupCode,
  GroupTeacher,
  DescriptionContainer,
  DescriptionLabel,
  Description,
  MenuContainer,
  MenuLabel,
  MenuUrl,
  MembersContainer,
  MembersLabel,
  MembersPictureContainer,
  MembersRemaining,
  ButtonContainer,
  SubscribeButton,
  UnsubscribeButton,
} from './DisciplineGroupInfoStyles'

const DisciplineGroupInfoScreen: React.FC = () => {
  const {
    subscribing,
    unsubscribing,
    disciplineGroup,
    disciplineGroupMembers,
    subscribeStudent,
    unsubscribeStudent,
  } = useDisciplineGroupInfoPresenter()

  const { user } = useMe()
  const insets = useSafeAreaInsets()

  const isSubscribed = useMemo(() => {
    if (!disciplineGroup?.studentIds || !user || !user.student?.id) return false

    return disciplineGroup.studentIds.includes(user.student.id)
  }, [disciplineGroup?.studentIds, user?.student?.id])

  const disciplineGroupCode = disciplineGroup?.code
  const disciplineCode = disciplineGroup?.discipline?.code
  const disciplineName = disciplineGroup?.discipline?.name
  const teacherName = disciplineGroup?.teacher?.user?.name

  const studentMembers = disciplineGroupMembers.filter(
    m => m.userType === 'STUDENT' && m.userId !== user?.id,
  )
  const chosenStudentMembers = studentMembers.slice(0, 10)
  const remainingStudentMembers = studentMembers.length - 10

  useStatusBar('primary')

  return (
    <Container
      headerProps={{
        style: { paddingTop: 24, paddingVertical: 24, minHeight: 0 },
      }}
    >
      <TopContainer>
        <DisciplineGroupContainer>
          <DisciplineContainer>
            <DisciplineName>{disciplineName}</DisciplineName>
            <DisciplineCode>{disciplineCode}</DisciplineCode>
          </DisciplineContainer>
          <GroupContainer>
            <GroupCode>{disciplineGroupCode}</GroupCode>

            <Stack d="horizontal" s={2} style={{ alignItems: 'center' }}>
              <Icon name="school" size={12} color="white" />
              <GroupTeacher>{teacherName}</GroupTeacher>
            </Stack>
          </GroupContainer>
        </DisciplineGroupContainer>
      </TopContainer>

      <BottomContainer>
        <DescriptionContainer>
          <DescriptionLabel>Descrição</DescriptionLabel>
          <Description>{disciplineGroup?.description}</Description>
        </DescriptionContainer>

        <MenuContainer>
          <MenuLabel>Link da ementa</MenuLabel>
          <MenuUrl>{disciplineGroup?.menuUrl}</MenuUrl>
        </MenuContainer>

        <MembersContainer>
          <MembersLabel>Alunos</MembersLabel>

          <MembersPictureContainer>
            {chosenStudentMembers.map((s, i) => (
              <UserProfilePicture
                key={s.userId}
                userId={s.userId}
                pictureProps={{
                  size: 36,
                  style: { marginLeft: i > 0 ? -15 : 0, zIndex: -i },
                }}
              />
            ))}

            {remainingStudentMembers > 0 && (
              <MembersRemaining>+ 7 pessoas</MembersRemaining>
            )}
          </MembersPictureContainer>
        </MembersContainer>
      </BottomContainer>

      {user?.type === 'STUDENT' && (
        <>
          {!isSubscribed ? (
            <ButtonContainer style={{ marginBottom: insets.bottom + 16 }}>
              <SubscribeButton
                title="Inscrever-se"
                loading={subscribing}
                disabled={subscribing}
                onPress={() => subscribeStudent()}
                // loadingProps={{ testID: 'login-loading' }}
              />
            </ButtonContainer>
          ) : (
            <ButtonContainer style={{ marginBottom: insets.bottom + 16 }}>
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
