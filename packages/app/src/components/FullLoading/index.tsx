import { Spinner } from '@/components/Spinner'

import React from 'react'

import { Container } from './styles'

export interface FullLoadingProps {
  loading?: boolean
  label?: string
}

export const FullLoading: React.FC<FullLoadingProps> = ({
  loading = true,
  children,
}) => {
  if (!loading) {
    return <>{children}</>
  }

  return (
    <Container>
      <Spinner />
    </Container>
  )
}

export const withLoadable = (Component: React.FC) => (props: any) => {


  return <Component {...props}/>
}
