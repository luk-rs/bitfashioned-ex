'use client'

import CMS from '@/pages/home/cms'
import Disconnected from '@/pages/home/disconnected'
import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  return <main className='flex-1 flex flex-col'>{!address ? <Disconnected /> : <CMS />}</main>
}
