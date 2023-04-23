import { Spacer } from '@/components/Spacer'
import { Spinner } from '@/components/Spinner'
import { useStatusBar } from '@/contexts/status-bar'

import React from 'react'
import {
  ScrollView,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import {
  useExperimentPresenter,
  withExperimentPresenter,
} from './ExperimentPresenter'
import {
  Container,
  OptionContainer,
  OptionIcon,
  OptionName,
} from './ExperimentStyles'

export interface ExperimentScreenProps {}

function ExperimentButton({
  disabled,
  onPress,
  children,
}: React.PropsWithChildren<TouchableOpacityProps>) {
  return (
    <TouchableOpacity
      style={{ opacity: disabled ? 0.6 : 1 }}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <OptionContainer pointerEvents="none">{children}</OptionContainer>
    </TouchableOpacity>
  )
}

function ExperimentLoading() {
  return (
    <View
      style={{
        backgroundColor: '#E9E9E9',
        padding: 12,
        borderRadius: 12,
      }}
    >
      <Spinner color="grey" size={24} />
    </View>
  )
}

const ExperimentScreen: React.FC<ExperimentScreenProps> = () => {
  const { generatePost, generateMessage } = useExperimentPresenter()

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Experimento UFBA' }}>
      <ScrollView contentContainerStyle={{ paddingTop: 24 }}>
        <ExperimentButton
          disabled={generatePost.loading}
          onPress={generatePost.generate}
        >
          {generatePost.loading ? (
            <ExperimentLoading />
          ) : (
            <OptionIcon name="post-add" />
          )}

          <OptionName>Gerar postagem - IC0029</OptionName>
        </ExperimentButton>

        <Spacer s={12} />

        <ExperimentButton
          disabled={generateMessage.loading}
          onPress={generateMessage.generate}
        >
          {generateMessage.loading ? (
            <ExperimentLoading />
          ) : (
            <OptionIcon name="add-comment" />
          )}
          <OptionName>Gerar mensagem - IC0029</OptionName>
        </ExperimentButton>
      </ScrollView>
    </Container>
  )
}

export default withExperimentPresenter(ExperimentScreen)
