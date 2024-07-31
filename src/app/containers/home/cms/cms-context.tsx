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
    const timeout = setTimeout(async () => {
      if (!address) return

      console.log('signing')
      const signedAddress = await signMessageAsync({ account: address, message: address })
      setSignature(signedAddress)
    }, 500)
    return () => {
      clearTimeout(timeout)
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
