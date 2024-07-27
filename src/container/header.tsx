'use client'

import Image from 'next/image'
import { useAccount, useBalance } from 'wagmi'
import { formatDecimals } from '../app/lib/rounding'
import SignInButton from './sign-in-button'

export default function Header() {
  const { address } = useAccount()
  const { data, isLoading, isError } = useBalance({ address })
  const balance = data?.value ? formatDecimals(data, 4) : '0.0000'

  return (
    <div className='flex flex-row items-center border-b-2 border-b-orange-300 h-24 px-10'>
      <div className='flex items-center space-x-2'>
        <Image alt='cms_icon' src='CMS_icon.svg' width={31} height={31} />
        <span>CMS</span>
      </div>
      <div className='ml-auto flex flex-row items-center'>
        {address && (
          <div className='mr-5 flex flex-row'>
            <Image alt='eth_logo' src='eth_icon.svg' height={16} width={16} />
            <p className='ml-2'>{isLoading ? '...' : isError ? 'N/A' : `${balance} ${data?.symbol}`}</p>
          </div>
        )}
        <SignInButton />
      </div>
    </div>
  )
}
