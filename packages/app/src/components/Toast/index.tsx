import { Spacer } from '@/components/Spacer'
import { Icon } from '@rneui/themed'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import {
  Container,
  IconContainer,
  TextContainer,
  Title,
  Description,
} from './styles'

export interface ToastRootProps {
  style?: StyleProp<ViewStyle>
  children: [React.ReactNode, React.ReactNode]
}

export interface ToastIconProps {
  name: string
}

export interface ToastTextProps {
  title?: string
  description?: string
}

function ToastRoot({ style, children }: ToastRootProps) {
  if (!children.length || children.length != 2)
    throw Error(
      'Children must to have two children: ToastIcon and ToastText components',
    )

  const [IconComponent, TextComponent] = children

  return (
    <Container style={style}>
      {IconComponent}
      <Spacer d="horizontal" />
      {TextComponent}
    </Container>
  )
}

function ToastIcon({ name }: ToastIconProps) {
  return (
    <IconContainer>
      <Icon name={name} type='material-community' color="white" />
    </IconContainer>
  )
}

function ToastText({ title, description }: ToastTextProps) {
  return (
    <TextContainer>
      {!!title && <Title>{title}</Title>}
      <Description>{description}</Description>
    </TextContainer>
  )
}

export default {
  Root: ToastRoot,
  Icon: ToastIcon,
  Text: ToastText
}
