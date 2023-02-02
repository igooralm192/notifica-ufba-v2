import { Header, HeaderProps } from '@/components/Header'

import React from 'react'

export interface LayoutProps {
  headerProps: HeaderProps
}

const Layout: React.FC<LayoutProps> = ({ headerProps, children }) => {
  return (
    <>
      <Header {...headerProps} />

      {children}
    </>
  )
}

export default Layout
