import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { Spacer } from '@/components/Spacer'
import { Spinner } from '@/components/Spinner'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import React, { useState } from 'react'
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
  InputContainer,
  ExperimentInput,
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

  const navigation = useNavigation()

  const [discipline, setDiscipline] = useState<IDiscipline | null>(null)
  const [disciplineGroup, setDisciplineGroup] =
    useState<IDisciplineGroup | null>(null)

  const handleDisciplineGroupSelected = (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => {
    setDiscipline(discipline)
    setDisciplineGroup(disciplineGroup)
  }

  const handleGeneratePost = () => {
    if (discipline && disciplineGroup) {
      generatePost.generate(disciplineGroup?.id)
    }
  }

  const handleGenerateMessage = () => {
    if (discipline && disciplineGroup) {
      generateMessage.generate(disciplineGroup?.id)
    }
  }

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Experimento UFBA' }}>
      <ScrollView contentContainerStyle={{ paddingTop: 24 }}>
        <InputContainer
          onPress={() => {
            navigation.navigate('SearchSubscribedGroupsScreen', {
              onDisciplineGroupSelected: handleDisciplineGroupSelected,
            })
          }}
        >
          <ExperimentInput
            label="Turma"
            placeholder="Selecione uma turma"
            pointerEvents="none"
            selection={{ start: 0, end: 0 }}
            value={
              discipline && disciplineGroup
                ? `${discipline?.code} | ${disciplineGroup?.code}`
                : undefined
            }
            editable={false}
            testID="experiment-discipline-group-input"
          />
        </InputContainer>

        {discipline && disciplineGroup && (
          <>
            <ExperimentButton
              disabled={generatePost.loading}
              onPress={handleGeneratePost}
            >
              {generatePost.loading ? (
                <ExperimentLoading />
              ) : (
                <OptionIcon name="post-add" />
              )}

              <OptionName>Gerar postagem</OptionName>
            </ExperimentButton>

            <Spacer s={12} />

            <ExperimentButton
              disabled={generateMessage.loading}
              onPress={handleGenerateMessage}
            >
              {generateMessage.loading ? (
                <ExperimentLoading />
              ) : (
                <OptionIcon name="add-comment" />
              )}
              <OptionName>Gerar mensagem</OptionName>
            </ExperimentButton>
          </>
        )}
      </ScrollView>
    </Container>
  )
}

export default withExperimentPresenter(ExperimentScreen)
