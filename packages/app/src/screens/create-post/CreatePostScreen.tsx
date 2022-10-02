import { FullLoading } from '@/components/FullLoading'
import { Input } from '@/components/Input'
import { useMe } from '@/contexts/me'
import { useNavigation } from '@/helpers'
import { useStatusBar } from '@/contexts/status-bar'
import { joiResolver } from '@hookform/resolvers/joi'

import Joi from 'joi'
import React, { useLayoutEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

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
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/core'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { AppNavigation } from '@/types/navigation'
import { IDiscipline, IDisciplineGroup } from '@shared/entities'
import { useState } from 'react'
import { Keyboard } from 'react-native'

export interface ICreatePostFormValues {
  disciplineId: string
  disciplineGroupId: string
  content: string
}

const createPostSchema = Joi.object({
  disciplineId: Joi.string(),
  disciplineGroupId: Joi.string().required(),
  content: Joi.string().required(),
})

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
    if (discipline) form.setValue('disciplineId', discipline.id)
  }, [discipline])

  useEffect(() => {
    if (disciplineGroup) form.setValue('disciplineGroupId', disciplineGroup.id)
  }, [disciplineGroup])

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  const handleSubmit = async ({
    disciplineGroupId,
    content,
  }: ICreatePostFormValues) => {
    Keyboard.dismiss()

    await createPost(disciplineGroupId, content)
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
            name="disciplineGroupId"
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
                textAlignVertical={undefined}
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
