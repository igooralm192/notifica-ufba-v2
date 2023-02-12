import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { ConfirmationModal } from '@/components/ConfirmationModal'
import { LoadingModal } from '@/components/LoadingModal'
import { Spacer } from '@/components/Spacer'
import UserProfilePicture from '@/components/UserProfilePicture'
import { useMe } from '@/contexts/me'
import { useBoolean } from '@/hooks/common'

import { Icon, useTheme } from '@rneui/themed'
import React from 'react'
import { TouchableOpacity } from 'react-native'

import {
  Container,
  NameContainer,
  Name,
} from './DisciplineGroupMemberListItemStyles'
import { useDisciplineGroupMembersPresenter } from '../DisciplineGroupMembersPresenter'

export interface DisciplineGroupMemberListItemProps {
  disciplineGroupMember: IDisciplineGroupMemberDTO
}

const DisciplineGroupMemberListItem: React.FC<
  DisciplineGroupMemberListItemProps
> = ({ disciplineGroupMember }) => {
  const { user } = useMe()
  const { theme } = useTheme()

  const { removeStudent } = useDisciplineGroupMembersPresenter()
  const removeStudentConfirmVisible = useBoolean()

  const { userId, userName, userType, studentId } = disciplineGroupMember

  const handleRemoveStudent = async () => {
    removeStudentConfirmVisible.off()

    if (studentId) removeStudent.remove(studentId)
  }

  return (
    <Container>
      <UserProfilePicture userId={userId} pictureProps={{ size: 36 }} />

      <Spacer d="horizontal" s={4} />

      <NameContainer>
        <Name>{userName}</Name>
      </NameContainer>

      <Spacer d="horizontal" s={4} />

      {user?.type === 'TEACHER' && userType == 'STUDENT' && (
        <TouchableOpacity
          hitSlop={{ top: 8, bottom: 8, left: 12, right: 12 }}
          onPress={removeStudentConfirmVisible.on}
        >
          <Icon
            type="material-community"
            name="delete-outline"
            color={theme.colors.error}
            size={18}
          />
        </TouchableOpacity>
      )}

      <ConfirmationModal
        visible={removeStudentConfirmVisible.value}
        title="Remover aluno"
        body={`Você tem certeza que deseja remover o aluno ${userName}?`}
        onConfirm={handleRemoveStudent}
        onBack={removeStudentConfirmVisible.off}
      />

      <LoadingModal
        visible={removeStudent.loading}
        description="Removendo aluno..."
      />
    </Container>
  )
}

export default DisciplineGroupMemberListItem
