import { IDisciplineGroup, IUser } from '@shared/entities'

import { BottomSheet } from '@/components/BottomSheet'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { LoadingModal } from '@/components/LoadingModal'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'
import { useNavigation } from '@/helpers'
import { useBoolean } from '@/hooks/common'

import { Icon, ListItem } from '@rneui/themed'
import React from 'react'

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
  const { unsubscribeStudent, deleteDisciplineGroup } =
    useDisciplineGroupsPresenter()

  const { user } = useMe()
  const navigation = useNavigation()

  const bottomMenuVisible = useBoolean()
  const unsubscribeConfirmVisible = useBoolean()
  const deleteGroupConfirmVisible = useBoolean()

  const options = [
    {
      label: 'Remover turma',
      onPress: unsubscribeConfirmVisible.on,
      filterUser: (user: Nullable<IUser>) => user?.type === 'STUDENT',
    },
    {
      label: 'Excluir turma',
      onPress: deleteGroupConfirmVisible.on,
      filterUser: (user: Nullable<IUser>) => user?.type === 'TEACHER',
    },
  ]

  const handleUnsubscribeStudent = () => {
    unsubscribeConfirmVisible.off()
    unsubscribeStudent.unsubscribe(disciplineGroup.id)
  }

  const handleDeleteDisciplineGroup = () => {
    deleteGroupConfirmVisible.off()
    deleteDisciplineGroup.delete(disciplineGroup.id)
  }

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
          onPress={bottomMenuVisible.on}
        />
      </RightContainer>

      <BottomSheet
        visible={bottomMenuVisible.value}
        onHide={bottomMenuVisible.off}
      >
        <DisciplineCode style={{ marginBottom: 16 }}>
          {disciplineGroup.discipline?.code} - {disciplineGroup.code}
        </DisciplineCode>

        {options
          .filter(option => option.filterUser(user))
          .map((option, i) => (
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
                <Icon name="delete-outline" color="red" size={22} />
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

        <ListItem onPress={bottomMenuVisible.off}>
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

        <ConfirmationModal
          visible={unsubscribeConfirmVisible.value}
          title="Remover turma"
          body="Você tem certeza que deseja se desinscrever dessa turma?"
          onConfirm={handleUnsubscribeStudent}
          onBack={unsubscribeConfirmVisible.off}
        />

        <ConfirmationModal
          visible={deleteGroupConfirmVisible.value}
          title="Excluir turma"
          body="Você tem certeza que deseja excluir essa turma?"
          onConfirm={handleDeleteDisciplineGroup}
          onBack={deleteGroupConfirmVisible.off}
        />

        <LoadingModal
          visible={unsubscribeStudent.loading}
          description="Desinscrevendo estudante..."
        />

        <LoadingModal
          visible={deleteDisciplineGroup.loading}
          description="Removendo turma..."
        />
      </BottomSheet>
    </Container>
  )
}

export default DisciplineGroupListItem
