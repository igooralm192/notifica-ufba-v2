import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import UserProfilePicture from '@/components/UserProfilePicture'
import { Spacer } from '@/components/Spacer'

import React from 'react'

import {
  Container,
  NameContainer,
  Name,
} from './DisciplineGroupMemberListItemStyles'

export interface DisciplineGroupMemberListItemProps {
  disciplineGroupMember: IDisciplineGroupMemberDTO
}

const DisciplineGroupMemberListItem: React.FC<
  DisciplineGroupMemberListItemProps
> = ({ disciplineGroupMember: { userId, userName } }) => {
  return (
    <Container>
      <UserProfilePicture userId={userId} pictureProps={{ size: 36 }} />

      <Spacer d="horizontal" s={4} />

      <NameContainer>
        <Name>{userName}</Name>
      </NameContainer>
    </Container>
  )
}

export default DisciplineGroupMemberListItem
