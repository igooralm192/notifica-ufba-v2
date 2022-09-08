import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import { Button, useTheme } from '@rneui/themed'
import React from 'react'
import { FlexAlignType } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  Container,
  TitleContainer,
  Title,
  Subtitle,
  Action,
} from './HeaderStyles'

export interface HeaderProps {
  title?: string
  subtitle?: string
  back?: boolean
  onBack?: () => void
  titleAlign?: FlexAlignType
  rightAction?: {
    icon: string
    onPress?: () => void
  }
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  back = true,
  onBack,
  titleAlign = 'flex-start',
  rightAction,
}) => {
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()
  const statusBar = useStatusBar()

  return (
    <Container
      style={{
        paddingTop: insets.top,
        minHeight: insets.top + 48,
        backgroundColor:
          statusBar.theme === 'light'
            ? theme.colors.white
            : theme.colors.primary,
      }}
    >
      <Action>
        {back && (
          <Button
            type="clear"
            icon={{
              name: 'arrow-back-ios',
              size: 20,
              containerStyle: {
                padding: 0,
                margin: 0,
              },
              iconStyle: {
                padding: 0,
                margin: 0,
                marginRight: 4,
              },
              color:
                statusBar.theme === 'light'
                  ? theme.colors.black
                  : theme.colors.white,
            }}
            iconContainerStyle={{
              padding: 0,
              margin: 0,
            }}
            buttonStyle={{ padding: 0, margin: 0 }}
            onPress={() => {
              if (onBack) onBack()
              else navigation.goBack()
            }}
          />
        )}
      </Action>

      <TitleContainer style={{ alignItems: titleAlign }}>
        {!!title && (
          <Title
            style={{
              color:
                statusBar.theme === 'light'
                  ? theme.colors.black
                  : theme.colors.white,
            }}
          >
            {title}
          </Title>
        )}

        {!!subtitle && (
          <Subtitle
            style={{
              color:
                statusBar.theme === 'light'
                  ? theme.colors.black
                  : theme.colors.white,
            }}
          >
            {subtitle}
          </Subtitle>
        )}
      </TitleContainer>

      <Action>
        {rightAction ? (
          <Button
            type="clear"
            icon={{
              name: rightAction.icon,
              type: 'material-community',
              size: 24,
              containerStyle: {
                padding: 0,
                margin: 0,
              },
              iconStyle: {
                padding: 0,
                margin: 0,
                marginLeft: 4,
              },
              color:
                statusBar.theme === 'light'
                  ? theme.colors.black
                  : theme.colors.white,
            }}
            iconContainerStyle={{
              padding: 0,
              margin: 0,
            }}
            buttonStyle={{ padding: 0, margin: 0 }}
            onPress={() => rightAction.onPress?.()}
          />
        ) : (
          <Spacer d="horizontal" s={24} />
        )}
      </Action>
    </Container>
  )
}

export default Header
