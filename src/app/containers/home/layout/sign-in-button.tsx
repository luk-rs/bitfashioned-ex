import Image from 'next/image'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function SignInButton() {
  const { connectAsync, connectors } = useConnect()
  const { disconnectAsync } = useDisconnect()
  const { address } = useAccount()

  async function signIn() {
    const metamask = connectors.find(c => c.name === 'MetaMask')
    await connectAsync({
      connector: metamask || injected()
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
        {!address
          ? 'Sign In'
          : `${address.substring(0, 6)}..${address.substring(address.length - 5, address.length - 1)}`}
      </p>
    </button>
  )
}
