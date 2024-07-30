import Image from 'next/image'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function SignInButton() {
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { address } = useAccount()
  const [addr, setAddr] = useState('')

  async function signIn() {
    const metamask = connectors.find(c => c.name === 'MetaMask')
    const x = await connectAsync({
      connector: metamask || injected()
    })
    setAddr(x.accounts[0])
  }

  async function signOut() {
    setAddr('')
    await disconnectAsync()
  }

  return (
    <button
      className='flex flex-row space-x-4 bg-bf-signinbkg p-2 rounded text-sm'
      onClick={!address ? signIn : signOut}
    >
      <div className='h-5 w-5 relative'>
        <Image alt='metamask' src='/metamask_icon.svg' sizes='auto' fill />
      </div>
      <p>{!addr ? 'Sign In' : `${addr.substring(0, 6)}..${addr.substring(addr.length - 5, addr.length - 1)}`}</p>
    </button>
  )
}
