'use server'

import { getPinataMetadata, uploadToPinata } from '@/lib/pinata'

export async function uploadPinataServerless(formData: FormData) {
  const file = formData.get('image') as File
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const cid = await uploadToPinata({ file, title, description })
  // const cid = await sdk.pinToIPFS({ file, title, description })

  return cid
}

export async function getMetadata(ipfsHash: string) {
  // return await sdk.getMetadata(ipfsHash)
  return getPinataMetadata(ipfsHash)
}
