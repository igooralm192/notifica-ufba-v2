import { Button, Image } from '@rneui/themed'
import { Stack } from '@/components/Stack'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const InnerContainer = styled.View`
  width: 300px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`

export const TitleContainer = styled.View`
  padding: 12px 16px;
`

export const Title = styled.Text`
  font-size: 16px;
  font-family: 'Inter_600SemiBold';
  color: ${({ theme }) => theme.colors.black};
`

export const PreviewImageContainer = styled.View`
  padding: 12px 16px;
  border: 0px solid ${({ theme }) => theme.colors.grey2};
  border-top-width: 1px;
`

export const PreviewImage = styled(Image)`
  width: 100%;
  height: 225px;
  border-radius: 8px;
`

export const ActionsContainer = styled(Stack)`
  padding: 12px 16px;
  align-items: stretch;
  border: 0px solid ${({ theme }) => theme.colors.grey2};
  border-top-width: 1px;
`

export const ActionButton = styled(Button).attrs(({ theme }) => {
  return {
    titleStyle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 14,
    },
    buttonStyle: {
      borderRadius: 8,
    },
  }
})``

export const UpdatePictureButton = styled(ActionButton)``

export const TakeAnotherButton = styled(ActionButton).attrs(
  ({ theme, titleStyle }) => {
    return {
      color: 'grey2',
      titleStyle: {
        ...titleStyle,
        color: theme.colors.black,
      },
    }
  },
)``

export const CancelButton = styled(ActionButton).attrs(
  ({ theme, titleStyle }) => {
    return {
      color: 'grey2',
      titleStyle: {
        ...titleStyle,
        color: theme.colors.black,
      },
    }
  },
)``
