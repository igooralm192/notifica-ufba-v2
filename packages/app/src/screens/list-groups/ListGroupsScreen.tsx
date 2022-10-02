import { FullLoading } from '@/components/FullLoading'
import { Input } from '@/components/Input'
import { Spacer } from '@/components/Spacer'
import { Spinner } from '@/components/Spinner'
import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'
import { ListGroupsItem } from '@/screens/list-groups/ListGroupsItem'
import { joiResolver } from '@hookform/resolvers/joi'
import { IDiscipline } from '@shared/entities'

import Joi from 'joi'
import React, { useLayoutEffect, useMemo } from 'react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList } from 'react-native'

import {
  useListGroupsPresenter,
  withListGroupsPresenter,
} from './ListGroupsPresenter'
import { Container, InputContainer, ListGroupsInput } from './ListGroupsStyles'

export interface IListGroupsFormValues {
  disciplineCode: string
}

const listGroupsSchema = Joi.object({
  disciplineCode: Joi.string().allow('').empty().optional(),
})

const ListGroupsScreen: React.FC = () => {
  const { loading, disciplines, onCodeChange, onDisciplineGroupSelected } =
    useListGroupsPresenter()

  const form = useForm<IListGroupsFormValues>({
    mode: 'onChange',
    resolver: joiResolver(listGroupsSchema),
  })

  const renderListGroupsItem = ({ item }: { item: IDiscipline }) => {
    return (
      <ListGroupsItem
        discipline={item}
        onDisciplineGroupPress={onDisciplineGroupSelected}
      />
    )
  }

  useStatusBar('primary')

  return (
    <Container headerProps={{}}>
      <InputContainer style={{ paddingTop: 8, paddingHorizontal: 16 }}>
        <Controller
          name="disciplineCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <ListGroupsInput
              placeholder="Digite o código da disciplina"
              value={field.value}
              onChangeText={(code) => {
                field.onChange(code)
                onCodeChange(code)
              }}
              onBlur={field.onBlur}
              errorMessage={fieldState.error?.message}
              renderErrorMessage={!!fieldState.error}
              testID="list-groups-discipline-input"
            />
          )}
        />
      </InputContainer>

      <FlatList
        data={disciplines.results}
        renderItem={renderListGroupsItem}
        style={{ borderTopWidth: 1, borderTopColor: '#dedede' }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        ListFooterComponent={
          <>
            {loading && (
              <>
                <Spacer />
                <Spinner />
              </>
            )}
          </>
        }
      />
    </Container>
  )
}

export default withListGroupsPresenter(ListGroupsScreen)
