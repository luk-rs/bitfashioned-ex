import { uploadPinataServerless } from '@/actions/upload-to-pinata-serverless'
import { saveToIDB } from '@/app/lib/indexed-db'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type AddContentFormProps = {
  handleCloseModal: () => void
}

export default function AddContentForm({ handleCloseModal }: AddContentFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [canUpload, setCanUpload] = useState(false)
  const [image, setImage] = useState<File | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
    checkValidity(file)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] }
  })

  function onFormChange(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()
    checkValidity(image)
  }

  function checkValidity(file: File | undefined) {
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    if (!!file) formData.append('image', file)

    const title = formData.get('title')
    const description = formData.get('description')
    const image = formData.get('image')

    const uploadAvailable = !!title && !!description && !!image
    setCanUpload(uploadAvailable)
  }

  async function upload(formData: FormData): Promise<void> {
    if (!image) return

    formData.append('image', image)

    const ipfsUrl = await uploadPinataServerless(formData)

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    await saveToIDB({ title, description, ipfsUrl })

    handleCloseModal()
    //resetState
  }

  return (
    <>
      <h1 className='text-xl pb-10'>Create Content</h1>
      <form ref={formRef} action={upload} className='flex flex-col w-96' onChange={onFormChange}>
        <label className='flex flex-col pb-5'>
          Title
          <input type='text' className='bg-transparent border border-gray-500 rounded p-2' name='title' />
        </label>
        <label className='flex flex-col pb-5'>
          Description
          <textarea className='bg-transparent border border-gray-500 rounded p-2' name='description' />
        </label>
        <label className='flex flex-col pb-5'>
          Image
          <div
            {...getRootProps()}
            className='bg-transparent border border-gray-500 rounded p-2 flex justify-center items-center cursor-pointer'
          >
            <input {...getInputProps()} />
            {imagePreview ? (
              <Image src={imagePreview} alt='Preview' className='max-h-40 w-full' width={0} height={0} />
            ) : (
              <p className='text-center'>Drag &apos;n drop an image here, or click to select one</p>
            )}
          </div>
        </label>

        <button
          type='submit'
          className={`w-full bg-bf-gold py-2 rounded-lg text-black font-bold ${!canUpload && 'opacity-50 pointer-events-none'}`}
        >
          Upload
        </button>
      </form>
    </>
  )
}
