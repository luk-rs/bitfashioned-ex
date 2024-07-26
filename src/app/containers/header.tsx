'use client'

import Image from 'next/image'

export default function Header() {
  return (
    <div className='flex flex-row items-center border-b-2 border-b-orange-300 h-24 px-10'>
      <div className='flex items-center space-x-2'>
        <Image alt='cms_icon' src='CMS_icon.svg' width={31} height={31} />
        <span>CMS</span>
      </div>
      <button
        className='ml-auto'
        onClick={() => {
          console.log('clicked biatch')
        }}
      >
        Sign In
      </button>
    </div>
  )
}
