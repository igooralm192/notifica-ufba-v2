import { useStatusBar } from '@/contexts/status-bar'
import React from 'react'

import { Container, InputContainer, SearchInput } from './styles'

export interface SearchLayoutProps {
  search: string
  searchPlaceholder?: string
  onSearchChange: (search: string) => void
}

export function SearchLayout({
  search,
  searchPlaceholder,
  onSearchChange,
  children,
}: React.PropsWithChildren<SearchLayoutProps>) {
  useStatusBar('primary')

  return (
    <Container headerProps={{}}>
      <InputContainer style={{ paddingTop: 8, paddingHorizontal: 16 }}>
        <SearchInput
          placeholder={searchPlaceholder}
          value={search}
          onChangeText={onSearchChange}
          testID="search-input"
        />
      </InputContainer>

      {children}
    </Container>
  )
}
