import { saveToIDB } from '@/app/lib/indexed-db'
import { uploadToPinata } from '@/app/lib/pinata'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Modal from '../../components/modal'

export default function AddContentButton() {
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [canUpload, setCanUpload] = useState(false)

  useEffect(() => {
    const canUpload = !!title && !!description && !!image
    setCanUpload(canUpload)
  }, [title, description, image])

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg'] }
  })

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  function resetState() {
    setTitle('')
    setDescription('')
    setImage(null)
    setImagePreview(null)
  }

  const handleCloseModal = () => {
    resetState()
    setShowModal(false)
  }
  async function upload(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    if (!image) return //TODO: probably an error should be logged here as this code is not even supposed to be reached if image has not been set yet

    const ipfsUrl = await uploadToPinata(image)

    await saveToIDB({ title, description, ipfsUrl })
  }

  return (
    <>
      <button
        className='ml-auto mr-10 bg-bf-gold p-3 rounded-lg text-black flex flex-row space-x-2 items-center font-bold'
        onClick={handleOpenModal}
      >
        <span>Create Content </span>
        <span className='border-2 border-black rounded-full w-6 h-6 flex items-center justify-center'>+</span>
      </button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h1 className='text-xl pb-10'>Create Content</h1>
        <div className='flex flex-col w-96'>
          <label className='flex flex-col pb-5'>
            Title
            <input
              type='text'
              className='bg-transparent border border-gray-500 rounded p-2'
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          <label className='flex flex-col pb-5'>
            Description
            <textarea
              className='bg-transparent border border-gray-500 rounded p-2'
              value={description}
              onChange={handleDescriptionChange}
            />
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
        </div>
        <button
          className={`w-full bg-bf-gold py-2 rounded-lg text-black font-bold ${!canUpload && 'opacity-50'}`}
          disabled={!canUpload}
          onClick={upload}
        >
          Upload
        </button>
      </Modal>
    </>
  )
}
