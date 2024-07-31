'use server'

import { uploadToPinata } from '@/lib/pinata'

export const uploadPinataServerless = async (formData: FormData) => {
  const file = formData.get('image') as File

  const cid = await uploadToPinata(file)

  return cid
}
