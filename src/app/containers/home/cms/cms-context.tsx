'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

type CMS = {
  signature: string
  reRender: boolean
  triggerRender: () => void
}
const CMSContext = createContext<CMS>({ signature: '', reRender: true, triggerRender: () => {} })

export const CMSProvider = ({ children }: { children: ReactNode }) => {
  const [signature, setSignature] = useState('')
  const [render, setRender] = useState(true)
  const reTriggerRender = () => setRender(prv => !prv)
  const { signMessageAsync } = useSignMessage()
  const { address } = useAccount()

  useEffect(() => {
    const addr2Sign = !!address && `${address}$`
    const storedSignature = !!addr2Sign && localStorage.getItem(addr2Sign)
    if (storedSignature) {
      setSignature(storedSignature)
    } else if (addr2Sign) {
      const timeout = setTimeout(async () => {
        const signedAddress = await signMessageAsync({ account: address, message: addr2Sign })
        setSignature(signedAddress)
        localStorage.setItem(addr2Sign, signedAddress)
      }, 500)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [address, signMessageAsync])

  return (
    <CMSContext.Provider value={{ signature: signature, reRender: render, triggerRender: reTriggerRender }}>
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const cms = useContext(CMSContext)
  return cms
}
