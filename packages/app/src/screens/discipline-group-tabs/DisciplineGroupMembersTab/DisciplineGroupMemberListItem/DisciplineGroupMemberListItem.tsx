import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { Spacer } from '@/components/Spacer'

import { useTheme } from '@rneui/themed'
import React from 'react'

import {
  Container,
  PictureContainer,
  Picture,
  NameContainer,
  Name
} from './DisciplineGroupMemberListItemStyles'

export interface DisciplineGroupMemberListItemProps {
  disciplineGroupMember: IDisciplineGroupMemberDTO
}

const DisciplineGroupMemberListItem: React.FC<
  DisciplineGroupMemberListItemProps
> = ({ disciplineGroupMember: {userName} }) => {
  const { theme } = useTheme()

  return (
    <Container>
      <PictureContainer>
        <Picture
          source={{
            width: 80,
            height: 80,
            uri: 'https://www.adobe.com/br/express/feature/image/media_142f9cf5285c2cdcda8375c1041d273a3f0383e5f.png?width=750&format=png&optimize=medium',
          }}
          resizeMode="cover"
        />
      </PictureContainer>

      <Spacer d='horizontal' s={4}/>

      <NameContainer>
        <Name>{userName}</Name>
      </NameContainer>
    </Container>
  )
}

export default DisciplineGroupMemberListItem
