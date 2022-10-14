import { IDisciplineGroup } from '@shared/entities'

import { BottomSheet } from '@/components/BottomSheet'
import { LoadingModal } from '@/components/LoadingModal'
import { Spacer } from '@/components/Spacer'
import { useNavigation } from '@/helpers'

import { Icon, ListItem } from '@rneui/themed'
import React, { useState } from 'react'

import { useDisciplineGroupsPresenter } from '../DisciplineGroupsPresenter'
import {
  Container,
  LeftContainer,
  LeftTopContainer,
  LeftBottomContainer,
  RightContainer,
  DisciplineCode,
  DisciplineName,
  DisciplineGroupTeacher,
} from './DisciplineGroupListItemStyles'

export interface DisciplineGroupListItemProps {
  disciplineGroup: IDisciplineGroup
}

const DisciplineGroupListItem: React.FC<DisciplineGroupListItemProps> = ({
  disciplineGroup,
}) => {
  const { isUnsubscribing, unsubscribeStudent } = useDisciplineGroupsPresenter()

  const navigation = useNavigation()

  const [visible, setVisible] = useState(false)

  const options = [
    {
      label: 'Remover disciplina',
      onPress: () => unsubscribeStudent(disciplineGroup.id),
    },
  ]

  return (
    <Container
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsScreen', {
          disciplineGroupId: disciplineGroup.id,
        })
      }
    >
      <LeftContainer>
        <LeftTopContainer>
          <DisciplineCode>
            {disciplineGroup.discipline?.code} - {disciplineGroup.code}
          </DisciplineCode>
          <DisciplineName>{disciplineGroup.discipline?.name}</DisciplineName>
        </LeftTopContainer>

        <Spacer />

        <LeftBottomContainer>
          <DisciplineGroupTeacher>
            {disciplineGroup.teacher?.user?.name}
          </DisciplineGroupTeacher>
        </LeftBottomContainer>
      </LeftContainer>

      <RightContainer>
        <Icon
          style={{ padding: 16 }}
          name="more-vert"
          onPress={() => setVisible(true)}
        />
      </RightContainer>

      <BottomSheet visible={visible} onHide={() => setVisible(false)}>
        <DisciplineCode style={{ marginBottom: 16 }}>
          {disciplineGroup.discipline?.code} - {disciplineGroup.code}
        </DisciplineCode>

        {options.map((option, i) => (
          <ListItem
            key={i}
            containerStyle={{
              // backgroundColor: '#F6F6F6',
              borderRadius: 8,
              padding: 12,
              paddingHorizontal: 0,
            }}
            onPress={option.onPress}
          >
            <ListItem.Content
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <Icon
                name="delete-outline"
                color="red"
                size={22}
                onPress={() => setVisible(true)}
              />
              <ListItem.Title
                style={{
                  justifyContent: 'center',
                  marginLeft: 8,
                  color: 'red',
                  fontFamily: 'Quicksand_600SemiBold',
                }}
              >
                {option.label}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}

        <ListItem onPress={() => setVisible(false)}>
          <ListItem.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 8,
            }}
          >
            <ListItem.Title
              style={{
                justifyContent: 'center',
                fontFamily: 'Quicksand_600SemiBold',
              }}
            >
              Voltar
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <LoadingModal
          visible={isUnsubscribing}
          description="Desinscrevendo estudante..."
        ></LoadingModal>
      </BottomSheet>
    </Container>
  )
}

export default DisciplineGroupListItem
