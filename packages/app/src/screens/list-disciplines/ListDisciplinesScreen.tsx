import { IDiscipline } from '@shared/entities'

import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'

import { ListDisciplinesItem } from './ListDisciplinesItem'
import {
  useListDisciplinesPresenter,
  withListDisciplinesPresenter,
} from './ListDisciplinesPresenter'
import { Container, InputContainer, ListDisciplinesInput } from './ListDisciplinesStyles'

export interface IListDisciplinesFormValues {
  disciplineCode: string
}

const listDisciplinesSchema = Joi.object({
  disciplineCode: Joi.string().allow('').empty().optional(),
})

const ListDisciplinesScreen: React.FC = () => {
  const {
    isFetchingMore,
    isRefreshing,
    disciplines,
    onNextPage,
    onRefresh,
    onCodeChange,
    onDisciplineSelected,
  } = useListDisciplinesPresenter()

  const form = useForm<IListDisciplinesFormValues>({
    mode: 'onChange',
    resolver: joiResolver(listDisciplinesSchema),
  })

  const renderListDisciplinesItem = ({ item }: { item: IDiscipline }) => {
    return (
      <ListDisciplinesItem
        discipline={item}
        onDisciplinePress={onDisciplineSelected}
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
            <ListDisciplinesInput
              placeholder="Digite o código da disciplina"
              value={field.value}
              onChangeText={code => {
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
        data={disciplines}
        renderItem={renderListDisciplinesItem}
        style={{ borderTopWidth: 1, borderTopColor: '#dedede' }}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        onEndReached={onNextPage}
        onEndReachedThreshold={0.15}
        ItemSeparatorComponent={Spacer}
        ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
        refreshControl={
          <RefreshControl
            refreshing={!isFetchingMore && isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </Container>
  )
}

export default withListDisciplinesPresenter(ListDisciplinesScreen)
