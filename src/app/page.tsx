'use client'

import Disconnected from '@/components/disconnected'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  return <main>{!address && <Disconnected />}</main>
}
