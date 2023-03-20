import React from 'react'

import {
  Container,
  PlaceholderText,
  NoDisciplineGroupsImage,
} from './styles'

export function NoDisciplineGroupsPlaceholder() {
  return (
    <Container>
      <NoDisciplineGroupsImage />

      <PlaceholderText>Não conseguimos encontrar a turma que você procura, tente novamente.</PlaceholderText>
    </Container>
  )
}
