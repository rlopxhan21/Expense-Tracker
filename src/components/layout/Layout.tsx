import React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface Props {
    children: JSX.Element
}

export const Layout: React.FC<Props> = ({ children}) => {
  return (
    <React.Fragment>
        <Header />
        {children}
        <Footer />  
    </React.Fragment>
  )
}
