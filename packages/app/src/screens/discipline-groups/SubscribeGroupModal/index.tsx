import { BottomSheet, BottomSheetProps } from '@/components/BottomSheet'
import { Spacer } from '@/components/Spacer'
import { Stack } from '@/components/Stack'
import UserProfilePicture from '@/components/UserProfilePicture'

import { Icon } from '@rneui/themed'
import React from 'react'

import {
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
} from './styles'

export interface SubscribeGroupModalProps extends BottomSheetProps {}

export const SubscribeGroupModal: React.FC<SubscribeGroupModalProps> = ({
  visible,
  onHide,
}) => {
  const students = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <BottomSheet visible={visible} onHide={onHide}>
      <DisciplineGroupContainer>
        <DisciplineContainer>
          <DisciplineName>Cálculo A</DisciplineName>
          <DisciplineCode>MATA02</DisciplineCode>
        </DisciplineContainer>
        <GroupContainer>
          <GroupCode>T010000</GroupCode>

          <Stack d="horizontal" s={2} style={{ alignItems: 'center' }}>
            <Icon name="school" size={12} />
            <GroupTeacher>Isaac Newton</GroupTeacher>
          </Stack>
        </GroupContainer>
      </DisciplineGroupContainer>

      <Spacer s={8} />

      <DescriptionContainer>
        <DescriptionLabel>Descrição</DescriptionLabel>
        <Description>Uma descrićão</Description>
      </DescriptionContainer>

      <MenuContainer>
        <MenuLabel>Link da ementa</MenuLabel>
        <MenuUrl>https://google.com</MenuUrl>
      </MenuContainer>

      <MembersContainer>
        <MembersLabel>Alunos</MembersLabel>

        <MembersPictureContainer>
          {students.slice(0, 10).map((s, i) => (
            <UserProfilePicture
              key={s}
              userId=""
              pictureProps={{
                size: 36,
                style: { marginLeft: i > 0 ? -15 : 0, zIndex: -i },
              }}
            />
          ))}

          <MembersRemaining>+ 7 pessoas</MembersRemaining>
        </MembersPictureContainer>
      </MembersContainer>

      <ButtonContainer>
        <SubscribeButton
          title="Inscrever-se"
          // loading={subscribing}
          // disabled={subscribing}
          // onPress={() => subscribeStudent()}
        />
      </ButtonContainer>
    </BottomSheet>
  )
}
