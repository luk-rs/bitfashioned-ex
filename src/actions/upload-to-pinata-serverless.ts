'use server'

import { uploadToPinata } from '@/lib/pinata'
import { revalidatePath } from 'next/cache'

export const uploadPinataServerless = async (formData: FormData) => {
  const file = formData.get('image') as File

  const ipfsUrl = await uploadToPinata(file)

  revalidatePath('/')

  return ipfsUrl
}
