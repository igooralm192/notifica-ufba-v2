import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import React from 'react'
import { FlatList, FlatListProps, RefreshControl } from 'react-native'

export interface SearchListProps<T> extends FlatListProps<T> {
  isFetchingMore: boolean
  isRefreshing: boolean
  onNextPage: () => void
  onRefresh: () => void
}

export function SearchList<T>({
  isFetchingMore,
  isRefreshing,
  data,
  renderItem,
  onNextPage,
  onRefresh,
}: SearchListProps<T>) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
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
  )
}
