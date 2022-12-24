import { Header, HeaderProps } from '@/components/Header'

import React, { PropsWithChildren } from 'react'

export interface LayoutProps extends PropsWithChildren {
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
