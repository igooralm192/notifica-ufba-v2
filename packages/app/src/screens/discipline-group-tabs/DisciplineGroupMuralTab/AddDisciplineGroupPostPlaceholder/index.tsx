import React from 'react'

import {
  Container,
  PlaceholderText,
  AddDisciplineGroupPostImage,
  AddDisciplineGroupPostButton,
} from './styles'

export interface AddDisciplineGroupPostPlaceholderProps {
  placeholder: string
  buttonTitle: string
  onAddDisciplineGroupPost?: () => void
}

export function AddDisciplineGroupPostPlaceholder({
  placeholder,
  buttonTitle,
  onAddDisciplineGroupPost,
}: AddDisciplineGroupPostPlaceholderProps) {
  return (
    <Container>
      <AddDisciplineGroupPostImage />

      <PlaceholderText>{placeholder}</PlaceholderText>

      {!!onAddDisciplineGroupPost && (
        <AddDisciplineGroupPostButton
          title={buttonTitle}
          onPress={onAddDisciplineGroupPost}
        />
      )}
    </Container>
  )
}
