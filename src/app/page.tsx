'use client'

import CMS from '@/app/containers/home/cms'
import Disconnected from '@/app/containers/home/disconnected'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  return <main className='flex-1 flex flex-col bg-bf-pagebkg'>{!address ? <Disconnected /> : <CMS />}</main>
}
