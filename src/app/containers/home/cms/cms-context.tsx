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
    const storedSignature = !!address && localStorage.getItem(address)
    if (storedSignature) {
      setSignature(storedSignature)
    } else if (address) {
      const timeout = setTimeout(async () => {
        const signedAddress = await signMessageAsync({ account: address, message: address })
        setSignature(signedAddress)
        localStorage.setItem(address, signedAddress)
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
