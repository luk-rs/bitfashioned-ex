'use client'

import { useAccount } from 'wagmi'
import Disconnected from './pages/disconnected'

export default function Home() {
  const { address } = useAccount()

  return <main className='flex-1 flex flex-col'>{!address && <Disconnected />}</main>
}
