import { IDiscipline } from '@shared/entities'

import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'

import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FlatList, RefreshControl } from 'react-native'

import { ListGroupsItem } from './ListGroupsItem'
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
  const {
    isFetchingMore,
    isRefreshing,
    disciplines,
    onNextPage,
    onRefresh,
    onCodeChange,
    onDisciplineGroupSelected,
  } = useListGroupsPresenter()

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
        renderItem={renderListGroupsItem}
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

export default withListGroupsPresenter(ListGroupsScreen)
