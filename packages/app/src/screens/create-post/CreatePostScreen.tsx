import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { joiResolver } from '@hookform/resolvers/joi'
import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

import {
  useCreatePostPresenter,
  withCreatePostPresenter,
} from './CreatePostPresenter'
import {
  Container,
  ScrollContainer,
  InputContainer,
  CreatePostInput,
  ButtonContainer,
  CreatePostButton,
} from './CreatePostStyles'
import { createPostSchema } from './schemas'

export interface ICreatePostFormValues {
  disciplineGroup: {
    id: string
    disciplineId: string
  }
  content: string
}

const CreatePostScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'CreatePostScreen'>>()

  const { creating, createPost } = useCreatePostPresenter()

  const [discipline, setDiscipline] = useState<IDiscipline | null>(
    route.params?.discipline || null,
  )
  const [disciplineGroup, setDisciplineGroup] =
    useState<IDisciplineGroup | null>(route.params?.disciplineGroup || null)

  const statusBar = useStatusBar()

  const form = useForm<ICreatePostFormValues>({
    mode: 'onChange',
    resolver: joiResolver(createPostSchema),
  })

  const handleDisciplineGroupSelected = (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => {
    setDiscipline(discipline)
    setDisciplineGroup(disciplineGroup)
  }

  useEffect(() => {
    if (discipline)
      form.setValue('disciplineGroup', {
        ...form.getValues().disciplineGroup,
        disciplineId: discipline.id,
      })
  }, [discipline])

  useEffect(() => {
    if (disciplineGroup) form.setValue('disciplineGroup', {
      ...form.getValues().disciplineGroup,
      id: disciplineGroup.id,
    })
  }, [disciplineGroup])

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  const handleSubmit = async ({
    disciplineGroup,
    content,
  }: ICreatePostFormValues) => {
    try {
      Keyboard.dismiss()

      await createPost(disciplineGroup.id, content)
    } catch (error) {}
  }

  const submitForm = form.handleSubmit(handleSubmit)

  return (
    <Container
      headerProps={{
        title: 'Criar postagem',
        titleAlign: 'flex-start',
      }}
    >
      <ScrollContainer>
        <InputContainer
          onPress={() =>
            navigation.navigate('ListGroupsScreen', {
              onDisciplineGroupSelected: handleDisciplineGroupSelected,
            })
          }
        >
          <Controller
            name="disciplineGroup"
            control={form.control}
            render={({ field, fieldState }) => (
              <CreatePostInput
                label="Turma"
                placeholder="Selecione uma turma"
                value={
                  discipline && disciplineGroup
                    ? `${discipline?.code} - ${disciplineGroup?.code}`
                    : undefined
                }
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                errorMessage={fieldState.error?.message}
                renderErrorMessage={!!fieldState.error}
                editable={false}
                // textAlignVertical={undefined}
                testID="create-post-discipline-group-input"
              />
            )}
          />
        </InputContainer>

        <InputContainer>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <CreatePostInput
                label="Conteúdo"
                placeholder="Digite o que você quer os outros saibam"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                errorMessage={fieldState.error?.message}
                renderErrorMessage={!!fieldState.error}
                autoCapitalize="none"
                multiline
                textAlignVertical="top"
                numberOfLines={8}
                testID="create-post-content-input"
              />
            )}
          />
        </InputContainer>
      </ScrollContainer>

      <ButtonContainer>
        <CreatePostButton
          title="Criar"
          loading={creating || form.formState.isSubmitting}
          disabled={creating}
          onPress={submitForm}
          // loadingProps={{ testID: 'login-loading' }}
        />
      </ButtonContainer>
    </Container>
  )
}

export default withCreatePostPresenter(CreatePostScreen)
