import { getConfig } from '@/wagmi'
import type { Metadata } from 'next'
import { Reddit_Mono } from 'next/font/google'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import './globals.css'
import { Providers } from './providers'

const inter = Reddit_Mono({
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
      <body className={inter.className}>
        <Providers initialState={initialState}>{props.children}</Providers>
      </body>
    </html>
  )
}
