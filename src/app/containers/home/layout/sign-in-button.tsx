import Image from 'next/image'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function SignInButton() {
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { address, status } = useAccount()

  async function signIn() {
    await connectAsync({
      connector: connectors[0] //TODO: assess scenarios with multiple wallets installed
    })
  }

  async function signOut() {
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
      <p>
        {status === 'connecting'
          ? '...'
          : !address
            ? 'Sign In'
            : `${address.substring(0, 6)}..${address.substring(address.length - 5, address.length - 1)}`}
      </p>
    </button>
  )
}
