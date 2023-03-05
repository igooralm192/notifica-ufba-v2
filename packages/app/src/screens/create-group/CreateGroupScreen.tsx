import { IDiscipline } from '@shared/entities'

import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { joiResolver } from '@hookform/resolvers/joi'
import { RouteProp, useRoute } from '@react-navigation/core'
import Joi from 'joi'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Keyboard } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
  useCreateGroupPresenter,
  withCreateGroupPresenter,
} from './CreateGroupPresenter'
import {
  Container,
  ScrollContainer,
  InputContainer,
  CreateGroupInput,
  ButtonContainer,
  CreateGroupButton,
} from './CreateGroupStyles'

export interface ICreateGroupFormValues {
  disciplineId: string
  code: string
  semester: string
  description: string
  menuUrl: string
  place: string
}

const createGroupSchema = Joi.object({
  disciplineId: Joi.string(),
  code: Joi.string().required(),
  semester: Joi.string().required(),
  description: Joi.string().required(),
  menuUrl: Joi.string().required(),
  place: Joi.string().required(),
})

const CreateGroupScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'CreateGroupScreen'>>()

  const { creating, createGroup } = useCreateGroupPresenter()

  const [discipline, setDiscipline] = useState<IDiscipline | null>(
    route.params?.discipline || null,
  )

  const statusBar = useStatusBar()

  const form = useForm<ICreateGroupFormValues>({
    mode: 'onChange',
    resolver: joiResolver(createGroupSchema),
  })

  const handleDisciplineSelected = (discipline: IDiscipline) => {
    setDiscipline(discipline)
  }

  useEffect(() => {
    if (discipline) form.setValue('disciplineId', discipline.id)
  }, [discipline])

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  const handleSubmit = async (data: ICreateGroupFormValues) => {
    try {
      Keyboard.dismiss()

      await createGroup(data)
    } catch (error) {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container
      headerProps={{
        title: 'Criar turma',
        titleAlign: 'flex-start',
      }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <ScrollContainer>
          <InputContainer
            onPress={() =>
              navigation.navigate('ListDisciplinesScreen', {
                onDisciplineSelected: handleDisciplineSelected,
              })
            }
          >
            <Controller
              name="disciplineId"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Disciplina"
                  placeholder="Selecione uma disciplina"
                  value={
                    discipline
                      ? `${discipline?.code} - ${discipline?.name}`
                      : undefined
                  }
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  editable={false}
                  textAlignVertical={undefined}
                  testID="create-group-discipline-group-input"
                />
              )}
            />
          </InputContainer>

          <InputContainer>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Código"
                  placeholder="Digite o código da turma"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  autoCapitalize="none"
                  testID="create-group-code-input"
                />
              )}
            />
          </InputContainer>

          <InputContainer>
            <Controller
              name="semester"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Semestre"
                  placeholder="Digite o semestre da turma"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  autoCapitalize="none"
                  testID="create-group-semester-input"
                />
              )}
            />
          </InputContainer>

          <InputContainer>
            <Controller
              name="menuUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Link da ementa"
                  placeholder="Digite o link da ementa da turma"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  autoCapitalize="none"
                  testID="create-group-menu-url-input"
                />
              )}
            />
          </InputContainer>

          <InputContainer>
            <Controller
              name="place"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Local"
                  placeholder="Digite o local da turma"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  autoCapitalize="none"
                  testID="create-group-place-input"
                />
              )}
            />
          </InputContainer>

          <InputContainer>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <CreateGroupInput
                  label="Descricão"
                  placeholder="Digite uma descricão para a turma"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  errorMessage={fieldState.error?.message}
                  renderErrorMessage={!!fieldState.error}
                  autoCapitalize="none"
                  multiline
                  numberOfLines={8}
                  textAlignVertical="top"
                  testID="create-group-description-input"
                />
              )}
            />
          </InputContainer>
        </ScrollContainer>

        <ButtonContainer>
          <CreateGroupButton
            title="Criar"
            loading={creating}
            disabled={creating}
            onPress={submitForm}
            // loadingProps={{ testID: 'login-loading' }}
          />
        </ButtonContainer>
      </SafeAreaView>
    </Container>
  )
}

export default withCreateGroupPresenter(CreateGroupScreen)
