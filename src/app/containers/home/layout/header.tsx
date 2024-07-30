'use client'

import { formatDecimals } from '@/app/utils/rounding'
import Image from 'next/image'
import { useAccount, useBalance } from 'wagmi'
import SignInButton from './sign-in-button'

export default function Header() {
  const { address } = useAccount()
  const { data, isLoading, isError } = useBalance({ address })
  const balance = formatDecimals(data, 4)

  return (
    <div className='flex flex-row items-center border-b-2 border-b-bf-gold h-24 px-10 bg-bf-pagebkg'>
      <div className='flex items-center space-x-2'>
        <div className='w-8 h-8 relative'>
          <Image alt='cms_icon' src='/CMS_icon.svg' sizes='auto' fill />
        </div>
        <span>CMS</span>
      </div>
      <div className='ml-auto flex flex-row items-center'>
        {address && (
          <div className='mr-5 flex flex-row items-center'>
            <div className='w-5 h-5 relative'>
              <Image alt='eth_logo' src='/eth_icon.svg' sizes='auto' fill />
            </div>
            <p className='ml-2'>{isLoading ? '...' : isError ? 'N/A' : `${balance} ${data?.symbol}`}</p>
          </div>
        )}
        <SignInButton />
      </div>
    </div>
  )
}
