import { getConfig } from '@/wagmi'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import Header from '../containers/header'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Bitfashioned images',
  description: 'Web3 app to manage ipfs images'
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(getConfig(), headers().get('cookie'))
  return (
    <html lang='en'>
      <body className={`${inter.className} h-lvh flex flex-col`}>
        <Providers initialState={initialState}>
          <Header />
          {props.children}
        </Providers>
      </body>
    </html>
  )
}
