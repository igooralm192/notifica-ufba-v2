import React from 'react'

import {
  Container,
  PlaceholderText,
  AddDisciplineGroupImage,
  AddDisciplineGroupButton,
} from './styles'

export interface AddDisciplineGroupPlaceholderProps {
  placeholder: string
  buttonTitle: string
  onAddDisciplineGroup: () => void
}

export function AddDisciplineGroupPlaceholder({
  placeholder = 'Ainda não há nada por aqui, entre já em uma turma.',
  buttonTitle = 'Entrar em uma turma',
  onAddDisciplineGroup,
}: AddDisciplineGroupPlaceholderProps) {
  return (
    <Container>
      <AddDisciplineGroupImage />

      <PlaceholderText>{placeholder}</PlaceholderText>

      <AddDisciplineGroupButton
        title={buttonTitle}
        onPress={onAddDisciplineGroup}
      />
    </Container>
  )
}
